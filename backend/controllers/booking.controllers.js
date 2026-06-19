import Listing from "../model/listing.model.js"
import Booking from "../model/booking.model.js"
import User from "../model/user.js"
import Notification from "../model/notification.model.js"

export const createBooking = async (req, res) => {
  try {
    let { listing: listingId, checkIn, checkOut, total } = req.body

    let listing = await Listing.findById(listingId)

    if (!listing) {
      return res.status(404).json({ message: "Listing is not found" })
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid checkIn/checkOut date" })
    }

  
    const overlappingBooking = await Booking.findOne({
      listing: listingId,
      status: "booked",
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    }).sort({ checkOut: -1 })

    if (overlappingBooking) {
      const blockedFrom = new Date(overlappingBooking.checkIn).toLocaleDateString()
      const blockedTill = new Date(overlappingBooking.checkOut).toLocaleDateString()
      return res.status(400).json({
        message: `This villa is already booked from ${blockedFrom} to ${blockedTill}. Please choose different dates.`
      })
    }

    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent: total,
      host: listing.host,
      guest: req.userId,
      listing: listing._id
    })

    let user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { booking: listing._id } },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "User is not found" })
    }

    return res.status(201).json({ message: "Booking Created", booking })

  } catch (error) {
    return res.status(500).json({ message: `booking error ${error}` })
  }
}

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ guest: req.userId })
            .populate("listing")
            .sort({ createdAt: -1 })

        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(500).json({ message: `getMyBookings error ${error}` })
    }
}
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params

        const booking = await Booking.findById(id)

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }

        if (booking.guest.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized to cancel this booking" })
        }

        if (booking.status === "cancel") {
            return res.status(400).json({ message: "Booking already cancelled" })
        }

        const today = new Date()
        const checkInDate = new Date(booking.checkIn)
        const diffInDays = (checkInDate - today) / (1000 * 60 * 60 * 24)

        if (diffInDays < 2) {
            return res.status(400).json({
                message: "Booking can only be cancelled at least 2 days before check-in"
            })
        }

        booking.status = "cancel"
        await booking.save()

        return res.status(200).json({ message: "Booking cancelled successfully", booking })

    } catch (error) {
        return res.status(500).json({ message: `cancelBooking error ${error}` })
    }
}
export const getHostBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ host: req.userId })
            .populate("listing")
            .populate("guest", "name email")
            .sort({ createdAt: -1 })

        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(500).json({ message: `getHostBookings error ${error}` })
    }
}



export const cancelBookingByHost = async (req, res) => {
    try {
        const { id } = req.params
        const { reason } = req.body

        const booking = await Booking.findById(id).populate("listing")

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }

        if (booking.host.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized to cancel this booking" })
        }

        if (booking.status === "cancel") {
            return res.status(400).json({ message: "Booking already cancelled" })
        }

        booking.status = "cancel"
        await booking.save()

        
        await Notification.create({
            user: booking.guest,
            message: `Your booking for "${booking.listing?.title || 'a property'}" (${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}) has been cancelled by the host.${reason ? ` Reason: ${reason}` : ''}`,
            type: "booking_cancelled_by_host",
            booking: booking._id
        })

        return res.status(200).json({ message: "Booking cancelled and guest notified", booking })

    } catch (error) {
        return res.status(500).json({ message: `cancelBookingByHost error ${error}` })
    }
}