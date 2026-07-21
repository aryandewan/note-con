import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post('/register', async (req, res) => {
     const {username, email, password} = req.body;
     const hashedPassword = bcrypt.hashSync(password, 8)
     try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token })
     } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
     }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        
        if(!user) {
            return res.status(401).send("Invalid credentials")
        }

        const match = bcrypt.compareSync(password, user.password)
        if(!match) {
            return res.status(401).send("Invalid creds")
        }

        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({ token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get('/info', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).send("No token found")
    try {
        const  { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, username: true, email:true }
        })
        res.json(user)
    } catch (err) {
        res.status(401).send("Invalid token")
    }
})

export default router;