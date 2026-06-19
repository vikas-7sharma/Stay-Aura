import jwt from "jsonwebtoken";

const tokengen = (userId) => {
    try {
        let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch(error) {
        console.log("token error")
    }
}

export default tokengen;