import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function MyBooking() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const isCompleted = (checkOut) => new Date(checkOut) < new Date()

    const [reviewPopup, setReviewPopup] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const handleSubmitReview = async (bookingId) => {
        if (!rating || !comment.trim()) return alert("Please add a rating and comment")
        try {
            await axios.post(serverUrl + "/api/review/add",
                { bookingId, rating, comment },
                { withCredentials: true }
            )
            alert("Review submitted!")
            setReviewPopup(null)
            setRating(0)
            setComment("")
        } catch (error) {
            alert(error.response?.data?.message || "Failed to submit review")
        }
    }

    const fetchBookings = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/booking/mybookings",
                { withCredentials: true }
            )
            setBookings(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return
        try {
            const result = await axios.put(
                serverUrl + `/api/booking/cancel/${id}`,
                {},
                { withCredentials: true }
            )
            alert(result.data.message)
            fetchBookings()
        } catch (error) {
            alert(error.response?.data?.message || "Failed to cancel booking")
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-start 
        flex-col gap-[30px] sm:gap-[50px] relative px-[16px] sm:px-[20px] pb-[50px] pt-[90px] sm:pt-[100px]'>

            <div
                className='w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] bg-[red] cursor-pointer fixed
                 top-[16px] left-[16px] rounded-[50%] flex items-center justify-center z-20 shadow-md'
                onClick={() => navigate("/")}
            >
                <FaArrowLeft className='w-[18px] h-[18px] sm:w-[25px] sm:h-[25px] text-[white]' />
            </div>

            <div className='w-full max-w-[600px] border-[2px] border-[#908c8c]
             px-[16px] py-[12px] sm:p-[15px] flex items-center justify-center 
             text-[18px] sm:text-[26px] md:text-[30px] rounded-md 
             text-[#613b3b] font-semibold text-center'>
                MY Booking
            </div>

            {loading ? (
                <p className='text-gray-400'>Loading...</p>
            ) : bookings.length === 0 ? (
                <p className='text-gray-400'>No bookings found.</p>
            ) : (
                <div className='w-[100%] flex items-center justify-center gap-[20px] sm:gap-[25px] 
                flex-wrap'>
                    {bookings.map((b) => (
                        <div key={b._id} className='w-full sm:w-[330px] max-w-[400px] border-[1px] border-[#dedddd] 
                        rounded-xl overflow-hidden shadow-md'>

                            <img src={b.listing?.image1} alt=""
                                className='w-full h-[180px] sm:h-[200px] object-cover' />

                            <div className='p-[15px] flex flex-col gap-[5px]'>
                                <h2 className='font-semibold text-[16px] sm:text-[18px] break-words'>
                                    {b.listing?.title?.toUpperCase()}
                                </h2>
                                <p className='text-gray-600 text-[13px] sm:text-[14px] break-words'>
                                    {`In ${b.listing?.landmark?.toUpperCase()}, ${b.listing?.city?.toUpperCase()}`}
                                </p>
                                <p className='text-[13px] sm:text-[14px]'>
                                    <strong>Check In:</strong> {new Date(b.checkIn).toLocaleDateString()}
                                </p>
                                <p className='text-[13px] sm:text-[14px]'>
                                    <strong>Check Out:</strong> {new Date(b.checkOut).toLocaleDateString()}
                                </p>
                                <p className='text-[13px] sm:text-[14px] font-semibold text-[#986b6b]'>
                                    Total: ₹{b.totalRent}
                                </p>
                                <span className={`text-[12px] sm:text-[13px] font-medium px-[10px] py-[3px] 
                                rounded-full w-fit ${b.status === "booked" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {b.status.toUpperCase()}
                                </span>
                                {b.status === "booked" && isCompleted(b.checkOut) && (
                                    <button
                                        className='mt-[10px] px-[15px] py-[8px] bg-[#1a5c38] 
                                        text-white rounded-lg text-[13px] sm:text-[14px] cursor-pointer hover:bg-[#143d27]'
                                        onClick={() => setReviewPopup(b._id)}>
                                        Write a Review
                                    </button>
                                )}
                                {b.status === "booked" && (
                                    <button
                                        className='mt-[10px] px-[15px] py-[8px] bg-red-600 
                                        text-white rounded-lg text-[13px] sm:text-[14px] cursor-pointer 
                                        hover:bg-red-700'
                                        onClick={() => handleCancel(b._id)}>
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Review Popup Modal */}
            {reviewPopup && (
                <div className='w-full min-h-screen flex items-center justify-center
                 bg-[#000000a9] fixed top-[0px] z-[200] p-[16px] sm:p-[20px]'>
                    <div className='max-w-[400px] w-full sm:w-[90%] bg-white p-[20px] sm:p-[25px] rounded-xl 
                    flex flex-col gap-[15px] relative'>

                        <button className='absolute top-[10px] right-[10px] text-gray-500'
                            onClick={() => setReviewPopup(null)}>✕</button>

                        <h2 className='text-[18px] sm:text-[20px] font-semibold'>Write a Review</h2>

                        <div className='flex gap-[5px]'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}
                                    className={`text-[26px] sm:text-[30px] cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                    onClick={() => setRating(star)}>
                                    ★
                                </span>
                            ))}
                        </div>

                        <textarea
                            placeholder="Share your experience..."
                            className='w-full h-[100px] border-[2px] rounded-lg p-[10px] text-[14px] sm:text-[15px] resize-none'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            className='w-full py-[10px] bg-[#1a5c38] text-white rounded-lg cursor-pointer'
                            onClick={() => handleSubmitReview(reviewPopup)}>
                            Submit Review
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyBooking