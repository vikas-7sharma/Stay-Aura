import mongoose from "mongoose"

const listingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:false
    },
  
    image1: { type: String},
    image2: { type: String},
    image3: { type: String},
  
    rent: { type: Number, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    category: { type: String, required: true },
   rating: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true })

const Listing = mongoose.model("Listing", listingSchema)

export default Listing