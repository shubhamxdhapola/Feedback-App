import express from "express"
import { getUserInfo, login, logout, register } from "../controllers/auth.controller.js"
import { autheticateUser } from "../middlewares/authenticateUser.js"

const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/register', register)
authRoutes.post('/logout', autheticateUser, logout)
authRoutes.get('/get-user-info', autheticateUser, getUserInfo)

export default authRoutes