import Review from "../model/review.model.js"
import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"

export const addReview = async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required" })
        }

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }

        if (booking.guest.toString() !== req.userId) {
            return res.status(403).json({ message: "You can only review your own booking" })
        }

        const today = new Date()
        if (new Date(booking.checkOut) > today) {
            return res.status(400).json({ message: "You can only review after your stay is completed" })
        }

        const existingReview = await Review.findOne({ booking: bookingId })
        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this booking" })
        }

        const review = await Review.create({
            listing: booking.listing,
            guest: req.userId,
            booking: bookingId,
            rating,
            comment
        })

    
        const allReviews = await Review.find({ listing: booking.listing })
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

        await Listing.findByIdAndUpdate(booking.listing, { rating: avgRating.toFixed(1) })

        return res.status(201).json({ message: "Review added successfully", review })

    } catch (error) {
        return res.status(500).json({ message: `addReview error ${error}` })
    }
}

export const getListingReviews = async (req, res) => {
    try {
        const { listingId } = req.params

        const reviews = await Review.find({ listing: listingId })
            .populate("guest", "name")
            .sort({ createdAt: -1 })

        return res.status(200).json(reviews)
    } catch (error) {
        return res.status(500).json({ message: `getListingReviews error ${error}` })
    }
}