import express from "express"
import IsAuth from "../middleware/IsAuth.js"
import { getCurrentUser } from "../controllers/user.controllers.js"

let userRoute = express.Router()
userRoute.get("/currentuser", IsAuth, getCurrentUser)

export default userRoute