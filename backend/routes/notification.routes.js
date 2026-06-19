import express from "express"
import isAuth from "../middleware/IsAuth.js"
import { getMyNotifications, markNotificationRead, markAllRead } from "../controllers/notification.controllers.js"

let notificationRouter = express.Router()
notificationRouter.get("/get", isAuth, getMyNotifications)
notificationRouter.put("/read/:id", isAuth, markNotificationRead)
notificationRouter.put("/readall", isAuth, markAllRead)

export default notificationRouter