import User from "../models/user.model.js"
import generateJwtToken from "../utils/generateJwtToken.js"
import saveCookie from "../utils/saveCookie.js"

export const register = async(req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({message : "Username is not available!"})
        }

        const newUser = await User.create(req.body)
        
        if(newUser){
            const token = generateJwtToken(newUser._id, newUser.username)
            saveCookie(token, res)
            res.status(200).json({
                userId : newUser._id,
                username : newUser.username
            })
        } else {
            console.log('Error in creating user')
            throw { status : 400 , message : "Something went wrong, Try again!"}
        }

    } catch(err) {
        console.log("Error in register controller : ", err)
        res.status(err.status || 500).json({ message: err.message || "Internal server error!" })
    }
}

export const login = async(req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const user = await User.findOne({username})

        if(!user) {
            return res.status(400).json({message : "Invalid credentials!"})
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect) {
            return res.status(401).json({message : "Invalid credentials!"})
        }

        if(user){
            const token = generateJwtToken(user._id, user.username)
            saveCookie(token, res)
            res.status(200).json({username : user.username})
        } else {
            console.log('Error in creating user')
            throw { status : 400 , message : "Something went wrong, Try again!"}
        }

    } catch(err) {
        console.log("Error in login controller : ", err)
        res.status(err.status || 500).json({ message: err.message || "Internal server error!" })
    }
}

export const logout = async(req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "Logged out successfully!" })
    } catch (err) {
        console.log("Error in logout controller:", err);
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const getUserInfo = async(req, res) => {
    try {
        res.status(200).json(req.user)
    } catch(err) {
        console.log("Error in getUserInfo controller:", err);
        res.status(500).json({ message: "Internal server error!" })
    }
}