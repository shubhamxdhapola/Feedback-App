import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const autheticateUser = async(req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({message : "Unauthorized - Token not provided!"})
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) return res.status(401).json({message : "Unauthorized - Invalid token!"})

            const user = await User.findById(decodedToken.userId).select("-password")
            if(!user) return res.status(404).json({message : "User not found!"})
            
            req.user = user

            next()
        })

    } catch(err) {
        console.log("Error in autheticateUser middleware : ", err)
    }
}