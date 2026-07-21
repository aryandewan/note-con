import express from 'express'
import {config} from "dotenv"
import auth from './routes/auth.js'
import session from './routes/session.js'

config()

const app = express()

const PORT = process.env.PORT || 5001

app.use(express.json());
app.use('/api/auth', auth)
app.use('/api/session/', session)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})