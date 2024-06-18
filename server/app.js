import express from 'express'
import { connectDB } from './utils/features.js'
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/error.js'
import cookieParser from 'cookie-parser'

import userRoute from './routes/user.router.js'
import chatRoute from './routes/chat.router.js'

dotenv.config({
    path: './.env',
})

//DB
const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 3000
connectDB(mongoURI)


const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/user',userRoute)
app.use('/chat',chatRoute)

app.get('/',(req,res)=> {
    res.send('hello world')
})

//errr middlware
app.use(errorMiddleware)

//listen
app.listen(port,()=>{
    console.log(`server is up at ${port}`)
})