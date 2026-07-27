import express from "express"
import prisma from "../prismaClient.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authMiddleware)

const GAME_MAX_SLOTS = {
  "Valorant": 5,
  "VALORANT": 5,
  "Apex Legends": 3,
  "Helldivers 2": 4,
  "Marvel Rivals": 6,
  "Counter-Strike 2": 5,
};


router.post('/', async (req, res) => {
    const { game, slots } = req.body
    const max = GAME_MAX_SLOTS[game]
    if(!max) {
        return res.status(400).send("Unknown Game")
    }
    const n = Number(slots)
    if(!Number.isInteger(n) || n < 2 || n > max) {
        return res.status(400).send(`${game} allows 2 to ${max} slots only.`)
    }
    try {
        const session = await prisma.$transaction( async (tx) => {
            const created = await tx.session.create({
                data: {
                    game, 
                    slots: n,
                    userId: req.user.id,
                    createdBy: req.user.username
                }
            })
            await tx.notification.create({
                data: {
                    userId: req.user.id,
                    type: "SQUAD_CREATED",
                    sessionId: created.id,

                }
            })
            await tx.member.create({
                data: {
                    sessionId: created.id,
                    userId: req.user.id,
                    role: "HOST"
                }
            })
            return tx.session.findUnique({
                where: {id: created.id},
                include: {
                    members:{
                        select: {
                            id: true,
                            role: true,
                            joinedAt: true,
                            user: {
                                select: {
                                    id: true, 
                                    username: true,
                                }
                            }
                        }
                    }
                }
            })
        })
        res.status(201).json(session)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get('/', async (req, res) => {
    try {
        const sessions = await prisma.session.findMany({
            where: { members: {
                some: {
                    userId: req.user.id
                }
            } },
            orderBy: {createdAt: "desc"},
            select: { id: true, game: true, slots: true, createdBy: true, members: true }
        })
        res.json(sessions)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get('/browse', async (req, res) => {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                members: {
                    none: {userId: req.user.id}
                }
            },
            orderBy: {createdAt: "desc"},
            select: {
                id: true,
                game: true,
                slots: true,
                createdBy: true,
                _count: { select: {members:true} }
            }
        })
        res.json(sessions)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.put('/join', async (req, res) => {
    const { sessionId } = req.body

    if (!sessionId) {
        return res.status(400).send("sessionId is required")
    }

    try {
        // 1. Find the session the user wants to join
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            select: { id: true, slots: true }
        })

        if (!session) {
            return res.status(404).send("Session not found")
        }

        // 3. Add the current user as a member (role defaults to PLAYER)
        await prisma.$transaction(async(tx) => {
            const members = await tx.member.findMany({
              where: { sessionId },
              select: { userId: true },
            });

            if (members.length >= session.slots) {
                throw new Error("SESSION_FULL")
            }

            await tx.member.create({
              data: {
                sessionId,
                userId: req.user.id,
              },
            });
            await tx.notification.create({
                data: {
                    userId: req.user.id,
                    type: "SQUAD_JOINED",
                    sessionId: sessionId
                }
            })
            await tx.notification.createMany({
                data: members.map((m) => ({
                    userId: m.userId,
                    type: "MEMBER_JOINED",
                    sessionId
                }))
            })
        })
        

        // 4. Return the session with its updated member list
        const updated = await prisma.session.findUnique({
            where: { id: sessionId },
            include: {
                members: {
                    select: {
                        id: true,
                        role: true,
                        joinedAt: true,
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        res.json(updated)
    } catch (err) {
        if(err.message === "SESSION_FULL") {
            return res.status(409).send("Session is full")
        }
        // Already a member -> unique constraint (userId + sessionId) fails
        if (err.code === 'P2002') {
            return res.status(409).send("You have already joined this session")
        }
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

export default router
