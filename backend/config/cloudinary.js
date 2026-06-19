import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

const uploadResult = async (filepath) => {
  try {

    // check filepath exists
    if (!filepath) {
      
      return null
    }

    
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "airbnb"
    })

  
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    
    return result.secure_url

  } catch (error) {

  
    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    return null
  }
}

export default uploadResult