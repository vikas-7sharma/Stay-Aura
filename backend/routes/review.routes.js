import express from "express"
import isAuth from "../middleware/IsAuth.js"
import { addReview, getListingReviews } from "../controllers/review.controllers.js"

let reviewRouter = express.Router()

reviewRouter.post("/add", isAuth, addReview)
reviewRouter.get("/listing/:listingId", getListingReviews)

export default reviewRouter   