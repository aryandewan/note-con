import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).send("No token found")
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        res.status(401).send("Invalid token")
    }
}

export default authMiddleware
