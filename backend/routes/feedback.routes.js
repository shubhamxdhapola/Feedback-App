import express from 'express'
import { addFeedback, getFeedbacks } from '../controllers/feedback.controller.js'
import { autheticateUser } from '../middlewares/authenticateUser.js'

const feedbackRoutes = express.Router()

feedbackRoutes.get('/:id', getFeedbacks)
feedbackRoutes.post('/:id', autheticateUser, addFeedback)

export default feedbackRoutes