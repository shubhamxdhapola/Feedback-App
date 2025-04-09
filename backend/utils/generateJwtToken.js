import jwt from 'jsonwebtoken'

export default function generateJwtToken(userId, username) {
    return jwt.sign({userId, username}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })
}