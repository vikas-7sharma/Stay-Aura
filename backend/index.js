import express from "express"
import dotenv, { config } from "dotenv"
import connnectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoute from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import notificationRouter from "./routes/notification.routes.js"
import reviewRouter from "./routes/review.routes.js"



dotenv.config()

let port = process.env.PORT || 8000
let app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin:"http://localhost:5173",
   credentials: true
}));

app.use("/api/review", reviewRouter)
app.use("/api/notification", notificationRouter)
app.use("/api/auth" ,authRouter)
app.use("/api/user",userRoute)
app.use("/api/listing",listingRouter)
app.use("/api/booking",bookingRouter)
app.get("/api/listing/testdelete/:id", (req, res) => res.json({ ok: true, id: req.params.id }))
connnectDB().then(() => {
    app.listen(port, () => {
        console.log("server started")
    })
})