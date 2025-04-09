import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import feedbackRoutes from './routes/feedback.routes.js'
import productRoutes from './routes/product.routes.js'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3001
const __dirname = path.resolve()

app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true,
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth/user', authRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/products', productRoutes)


if(process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })
}
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on PORT : ${PORT}`)
})