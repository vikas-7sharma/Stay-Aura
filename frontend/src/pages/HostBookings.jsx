import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function HostBookings() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchHostBookings = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/booking/hostbookings",
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
        fetchHostBookings()
    }, [])

    const handleHostCancel = async (id) => {
        const reason = window.prompt("Enter cancellation reason (optional):") || ""
        if (!window.confirm("Are you sure you want to cancel this booking? The guest will be notified.")) return
        try {
            const result = await axios.put(
                serverUrl + `/api/booking/cancelbyhost/${id}`,
                { reason },
                { withCredentials: true }
            )
            alert(result.data.message)
            fetchHostBookings()
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
                Bookings On My Properties
            </div>

            {loading ? (
                <p className='text-gray-400'>Loading...</p>
            ) : bookings.length === 0 ? (
                <p className='text-gray-400'>No bookings on your properties yet.</p>
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
                                    <strong>Guest:</strong> {b.guest?.name || "Unknown"}
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
                                {b.status === "booked" && (
                                    <button
                                        className='mt-[10px] px-[15px] py-[8px] bg-red-600 
                                        text-white rounded-lg text-[13px] sm:text-[14px] cursor-pointer hover:bg-red-700'
                                        onClick={() => handleHostCancel(b._id)}>
                                        Cancel This Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default HostBookings