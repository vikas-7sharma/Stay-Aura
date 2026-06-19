import uploadResult from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.js";

export const addlisting = async (req, res) => {
  try {
    console.log(req.files)
    let host = req.userId;
    let { title, description, rent, city, landmark, category } = req.body;

    if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
      return res.status(400).json({ message: "All 3 images are required" })
    }

    let image1 = await uploadResult(req.files.image1[0].path)
    let image2 = await uploadResult(req.files.image2[0].path)
    let image3 = await uploadResult(req.files.image3[0].path)
      console.log(image1)
      console.log(image2)
      console.log(image3)
    let listing = await Listing.create({
      title, description, rent,
      city, landmark, category,
      image1, image2, image3,
      host,
    })

    let updatedUser = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: "user is not found" })
    }

    res.status(201).json(listing)

  } catch (error) {
    res.status(500).json({ message: `AddListing error ${error}` })
  }
}
export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 })
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `getListing error ${error}` })
    }
}
export const getMyListing = async (req, res) => {
    try {
        const listings = await Listing.find({ host: req.userId }).sort({ createdAt: -1 })  // host not user
        res.status(200).json(listings)
    } catch (error) {
        res.status(500).json({ message: `getMyListing error ${error}` })
    }
}

export const findListing = async (req, res) => {
  try {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
      res.status(404).json({ message: "listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json(`findListing error ${error}`);
  }
};

export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) return res.status(404).json({ message: "Listing not found" })
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `getListingById error ${error}` })
    }
}
export const updatelisting = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, rent, city, landmark, category } = req.body

        const listing = await Listing.findById(id)
        if (!listing) return res.status(404).json({ message: "Listing not found" })

        if (listing.host.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized to edit this listing" })
        }

        let image1 = listing.image1
        let image2 = listing.image2
        let image3 = listing.image3

        if (req.files?.image1) image1 = await uploadResult(req.files.image1[0].path)
        if (req.files?.image2) image2 = await uploadResult(req.files.image2[0].path)
        if (req.files?.image3) image3 = await uploadResult(req.files.image3[0].path)

        const updated = await Listing.findByIdAndUpdate(
            id,
            { title, description, rent, city, landmark, category, image1, image2, image3 },
            { new: true }
        )

        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: `updatelisting error ${error}` })
    }
}
export const deletelisting = async (req, res) => {
    try {
        const { id } = req.params
        const listing = await Listing.findById(id)

        if (!listing) return res.status(404).json({ message: "Listing not found" })

        if (listing.host.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized to delete this listing" })
        }

        await Listing.findByIdAndDelete(id)

        await User.findByIdAndUpdate(req.userId, { $pull: { listing: id } })

        res.status(200).json({ message: "Listing deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: `deletelisting error ${error}` })
    }
}