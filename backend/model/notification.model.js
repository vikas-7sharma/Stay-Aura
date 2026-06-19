import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["booking_cancelled_by_host", "booking_cancelled_by_guest", "general"],
        default: "general"
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Notification = mongoose.model("Notification", notificationSchema)
export default Notification