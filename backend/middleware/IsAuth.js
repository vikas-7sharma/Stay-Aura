import jwt from "jsonwebtoken"

const IsAuth = (req, res, next) => {
        
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

export default IsAuth