import express from "express"
import IsAuth from "../middleware/IsAuth.js"
import upload from "../middleware/multer.js"
import { addlisting, getListingById, getListing, getMyListing,deletelisting,updatelisting } from "../controllers/listing.controllers.js"

const listingRouter = express.Router()

listingRouter.post("/add", IsAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), addlisting)

listingRouter.get("/get", getListing)
listingRouter.get("/mylist", IsAuth, getMyListing)
listingRouter.get("/findlistingbyid/:id", IsAuth, getListingById)
listingRouter.delete("/delete/:id", IsAuth, deletelisting)

listingRouter.put("/update/:id", IsAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), updatelisting)

export default listingRouter