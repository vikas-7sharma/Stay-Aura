import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    listing: [{                              
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],
    booking: [{                              
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]

}, { timestamps: true })

const User = mongoose.model("User", userschema)  
export default User