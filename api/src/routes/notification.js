import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        type: true,
        readAt: true,
        createdAt: true,
        session: { select: { id: true, game: true } },
      },
    });

    const unreadCount = await prisma.notification.count({
      where: {userId: req.user.id, readAt: null}
    })

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put('/', async (req, res) => {
    try {
        const notification = await prisma.notification.updateMany({
            where: {userId: req.user.id, readAt: null},
            data: {
              readAt: new Date()
            }
        })
        res.json(notification)
    } catch(err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
})

export default router;
