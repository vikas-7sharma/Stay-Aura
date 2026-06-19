import Notification from "../model/notification.model.js"

export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.userId })
            .sort({ createdAt: -1 })
        return res.status(200).json(notifications)
    } catch (error) {
        return res.status(500).json({ message: `getMyNotifications error ${error}` })
    }
}

export const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params
        const notification = await Notification.findOneAndUpdate(
            { _id: id, user: req.userId },
            { isRead: true },
            { new: true }
        )
        if (!notification) return res.status(404).json({ message: "Notification not found" })
        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({ message: `markNotificationRead error ${error}` })
    }
}

export const markAllRead = async (req, res) => {
    try {
        await Notification.updateMany({ user: req.userId, isRead: false }, { isRead: true })
        return res.status(200).json({ message: "All notifications marked as read" })
    } catch (error) {
        return res.status(500).json({ message: `markAllRead error ${error}` })
    }
}