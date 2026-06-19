import express from "express"
import isAuth from "../middleware/IsAuth.js";
import { createBooking, getMyBookings,cancelBooking, getHostBookings,cancelBookingByHost} from "../controllers/booking.controllers.js";  // ADD getMyBookings

let bookingRouter = express.Router()
bookingRouter.post("/create", isAuth, createBooking)
bookingRouter.get("/mybookings", isAuth, getMyBookings) 
bookingRouter.get("/hostbookings", isAuth, getHostBookings)  
bookingRouter.put("/cancel/:id", isAuth, cancelBooking) 
bookingRouter.put("/cancelbyhost/:id", isAuth, cancelBookingByHost) 

export default bookingRouter;