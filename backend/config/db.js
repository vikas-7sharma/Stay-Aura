import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL.trim())
        console.log("MongoDB connected ✅")
    } catch(error) {
        console.log("MongoDB error ❌:", error.message) // ← show real error
    }
}

export default connectDB;