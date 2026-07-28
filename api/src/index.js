import express from 'express'
import {config} from "dotenv"
import auth from './routes/auth.js'
import session from './routes/session.js'
import notification from "./routes/notification.js"
import cors from 'cors'

config()

const app = express()

const PORT = process.env.PORT || 5001

app.use(cors({ origin: process.env.CORS_ORIGIN}))
app.use(express.json());
app.use('/api/auth', auth)
app.use('/api/session/', session)
app.use('/api/notification', notification)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})