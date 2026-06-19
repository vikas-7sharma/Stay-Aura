import React, { useContext, useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { listingDataContext } from '../context/listingDataContext'
import { userDataContext } from '../context/UserContext'
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../context/BookingContext'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function ViewCard() {
    const navigate = useNavigate()
    const { cardDetails, handleupdatelisting, loading,
            title, setTitle,
            description, setDescription,
            rent, setRent,
            city, setCity,
            landmark, setLandmark,
            category, setCategory,
            frontEndImage1, frontEndImage2, frontEndImage3,
            setBackEndImage1, setBackEndImage2, setBackEndImage3,
            setFrontEndImage1, setFrontEndImage2, setFrontEndImage3,
            handleDeleteListing, getReviews, listingReviews,  
          } = useContext(listingDataContext)
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [updatepopup, setupdatepopup] = useState(false)
    const [BookingPopUp, setBookingPopUp] = useState(false)
    const [MinDate, setMinDate] = useState("")
    const [isBooking, setIsBooking] = useState(false)

    let { checkIn, setcheckIn,
          checkOut, setcheckOut,
          Total, setTotal,
          Night, setNight
    } = useContext(bookingDataContext)

    useEffect(() => {
        if (cardDetails?._id) getReviews(cardDetails._id)
    }, [cardDetails])

    useEffect(() => {
        if (checkIn && checkOut && cardDetails) {
            let inDate = new Date(checkIn)
            let outDate = new Date(checkOut)
            let n = (outDate - inDate) / (24 * 60 * 60 * 1000)
            setNight(n)
            let airBnbCharge = cardDetails.rent * (7 / 100)
            let tax = cardDetails.rent * (7 / 100)
            if (n > 0) {
                setTotal((cardDetails.rent * n) + airBnbCharge + tax)
            } else {
                setTotal(0)
            }
        }
    }, [checkIn, checkOut])

    useEffect(() => {
        if (updatepopup && cardDetails) {
            setTitle(cardDetails.title || "")
            setDescription(cardDetails.description || "")
            setRent(cardDetails.rent || "")
            setCity(cardDetails.city || "")
            setLandmark(cardDetails.landmark || "")
            setCategory(cardDetails.category || "")
            setFrontEndImage1(cardDetails.image1 || null)
            setFrontEndImage2(cardDetails.image2 || null)
            setFrontEndImage3(cardDetails.image3 || null)
        }
    }, [updatepopup, cardDetails])

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    if (!cardDetails) {
        return <div className='w-full h-screen flex items-center justify-center'>Loading...</div>
    }

    const isOwner = userData && cardDetails.host === userData._id

    const handleImageChange = (e, setFront, setBack) => {
        const file = e.target.files[0]
        if (file) {
            setBack(file)
            setFront(URL.createObjectURL(file))
        }
    }

    const handleBooking = async () => {
        if (isBooking) return
        if (!checkIn || !checkOut) return alert("Please select check-in and check-out dates")

        setIsBooking(true)
        try {
            await axios.post(serverUrl + "/api/booking/create", {
                listing: cardDetails._id,
                checkIn,
                checkOut,
                total: Total,
                nights: Night
            }, { withCredentials: true })
            alert("Booking confirmed!")
            setBookingPopUp(false)
        } catch (error) {
            alert(error.response?.data?.message || "Booking failed")
        } finally {
            setIsBooking(false)
        }
    }

    return (
        <div className='w-full min-h-screen justify-start items-center gap-[10px] flex
          flex-col overflow-x-hidden bg-white relative pb-[120px]'>

            <div className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] justify-center items-center 
              rounded-[50%] fixed top-[16px] left-[16px] sm:absolute sm:top-[5%] sm:left-[5%] 
              bg-red-500 flex cursor-pointer z-30 shadow-md"
                onClick={() => navigate(-1)}>
                <FaArrowLeft className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] text-white" />
            </div>

            <div className='w-[95%] justify-start items-start text-[25px]
             md:w-[80%] mb-[10px] mt-[70px] sm:mt-[10px]'>
                <h1 className='text-[18px] sm:text-[20px] md:text-[30px] text-ellipsis
               text-[#272727] text-nowrap overflow-hidden'>
                    {`In ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                </h1>
            </div>

            <div className='w-[95%] h-auto sm:h-[400px] flex items-center justify-center flex-col 
             md:w-[80%] md:flex-row'>
                <div className='w-[100%] h-[220px] sm:h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex
               items-center justify-center border-[2px] border-[white]'>
                    <img src={cardDetails.image1} alt="" className='w-[100%] h-full object-cover' />
                </div>
                <div className='w-[100%] flex flex-row sm:flex-col items-center justify-center md:w-[50%] 
               md:h-[100%]'>
                    <div className='w-[50%] sm:w-[100%] h-[120px] sm:h-[100%] overflow-hidden flex items-center
                 justify-center border-[2px] border-[white]'>
                        <img src={cardDetails.image2} alt="" className='w-[100%] h-full object-cover' />
                    </div>
                    <div className='w-[50%] sm:w-[100%] h-[120px] sm:h-[100%] overflow-hidden flex items-center
                 justify-center border-[2px] border-[white]'>
                        <img src={cardDetails.image3} alt="" className='w-[100%] h-full object-cover' />
                    </div>
                </div>
            </div>

            <div className='w-[95%] flex items-start justify-start text-[16px] 
            md:w-[80%] md:text-[25px] break-words'>
                {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}, ${cardDetails.landmark.toUpperCase()}`}
            </div>

            <div className='w-[95%] flex items-start justify-start text-[15px] 
            md:w-[80%] md:text-[25px] text-gray-800 break-words'>
                {cardDetails.description.toUpperCase()}
            </div>
          
            <div className='w-[95%] flex items-start justify-start text-[16px] 
            md:w-[80%] md:text-[25px]'>
                {`Rs.${cardDetails.rent}/day`}
            </div>

            <div className='w-[95%] md:w-[80%] mt-[20px] mb-[20px]'>
                <h2 className='text-[18px] sm:text-[20px] font-semibold mb-[10px] text-[#222]'>Where you'll be</h2>
                <iframe
                    className='w-full h-[250px] sm:h-[350px] rounded-xl border-[1px] border-gray-200'
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(cardDetails.landmark + ", " + cardDetails.city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
                <p className='text-gray-500 text-[13px] sm:text-[14px] mt-[8px]'>
                    {cardDetails.landmark}, {cardDetails.city}
                </p>
            </div>

            {/* Reviews Section */}
            <div className='w-[95%] md:w-[80%] flex flex-col gap-[20px] mt-[10px] mb-[20px] pt-[20px] border-t border-gray-200'>
                <h2 className='text-[18px] sm:text-[22px] font-semibold flex items-center gap-[8px] text-[#222]'>
                    <span className='text-yellow-500'>★</span>
                    {cardDetails.rating || 0} · {listingReviews.length} review{listingReviews.length !== 1 ? "s" : ""}
                </h2>
                {listingReviews.length === 0 ? (
                    <p className='text-gray-400 text-[14px] sm:text-[15px]'>No reviews yet for this property.</p>
                ) : (
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-[20px]'>
                        {listingReviews.map((r) => (
                            <div key={r._id} className='flex gap-[12px] items-start'>
                                <div className='w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-full bg-[#1a5c38] 
                                text-white flex items-center justify-center font-semibold 
                                text-[14px] sm:text-[16px] flex-shrink-0'>
                                    {r.guest?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <div className='flex flex-col gap-[3px] min-w-0'>
                                    <span className='font-semibold text-[14px] sm:text-[15px] text-[#222]'>{r.guest?.name}</span>
                                    <div className='flex gap-[2px] text-[12px] sm:text-[13px] text-yellow-500'>
                                        {"★".repeat(r.rating)}
                                        <span className='text-gray-300'>{"★".repeat(5 - r.rating)}</span>
                                    </div>
                                    <p className='text-gray-600 text-[13px] sm:text-[14px] leading-[1.4] mt-[2px] break-words'>{r.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isOwner ? (
                <div className='flex gap-[10px] w-[95%] md:w-[80%] justify-end fixed bottom-[15px] left-1/2 
                -translate-x-1/2 md:absolute md:left-auto md:translate-x-0 md:right-[5%] md:bottom-[5%] z-20'>
                    <button
                        className='flex-1 md:flex-none px-[20px] sm:px-[40px] py-[10px] bg-[#1a5c38] text-[white] text-[14px] sm:text-[18px]
                        md:px-[60px] rounded-lg cursor-pointer shadow-lg'
                        onClick={() => setupdatepopup(prev => !prev)}>
                        Edit Listing
                    </button>
                    <button
                        className='flex-1 md:flex-none px-[20px] sm:px-[40px] py-[10px] bg-red-600 text-[white] text-[14px] sm:text-[18px]
                        md:px-[60px] rounded-lg cursor-pointer shadow-lg'
                        onClick={() => handleDeleteListing(cardDetails._id)}
                        disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            ) : (
                <button
                    className='w-[90%] sm:w-auto px-[50px] py-[10px] bg-[red] text-[white] text-[16px] sm:text-[18px]
                    md:px-[100px] rounded-lg fixed bottom-[15px] left-1/2 -translate-x-1/2
                    md:absolute md:right-[5%] md:bottom-[5%] md:left-auto md:translate-x-0 cursor-pointer shadow-lg z-20'
                    onClick={() => setBookingPopUp(prev => !prev)}>
                    Reserve
                </button>
            )}

            {updatepopup && (
                <div className='flex items-center justify-center w-[100vw] h-[100vh] 
                fixed bg-[#000000a9] z-[100] top-[0px] backdrop-blur-sm px-[10px]'>

                    <RxCross1 className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] justify-center items-center 
                    rounded-[50%] fixed top-[16px] left-[16px] bg-red-500 flex cursor-pointer 
                    text-white p-[8px] z-[110]"
                        onClick={() => setupdatepopup(false)} />

                    <form
                        className='max-w-[900px] max-h-[85vh] items-center
                        justify-start overflow-auto p-[16px] sm:p-[20px] w-full sm:w-[90%] flex flex-col 
                        gap-[15px] bg-[#2b2727] text-white rounded-xl relative'
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleupdatelisting(cardDetails._id)
                        }}>

                        <div className='px-[20px] h-[40px] sm:h-[45px] text-white 
                        bg-red-500 flex justify-center items-center rounded-[30px] shadow-lg
                        text-[14px] sm:text-[16px] font-medium mb-[10px]'>
                            Update Your Home
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">Title</label>
                            <input type="text" value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] rounded-lg 
                                text-[15px] sm:text-[18px] text-black focus:outline-none focus:border-blue-500" required />
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">Description</label>
                            <textarea value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-[100px] sm:h-[120px] px-[15px] sm:px-[20px] py-[10px] border-[2px] 
                                rounded-lg text-[15px] sm:text-[18px] text-black resize-none focus:outline-none 
                                focus:border-blue-500" required />
                        </div>

                        <div className='flex items-start flex-col gap-[10px] w-full'>
                            <label className='text-[16px] sm:text-[20px]'>Image 1</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => handleImageChange(e, setFrontEndImage1, setBackEndImage1)}
                                className='w-full text-[14px] sm:text-[18px]' />
                            {frontEndImage1 && <img src={frontEndImage1} alt="preview"
                                className='w-[120px] h-[80px] object-cover rounded-md' />}
                        </div>

                        <div className='flex items-start flex-col gap-[10px] w-full'>
                            <label className='text-[16px] sm:text-[20px]'>Image 2</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => handleImageChange(e, setFrontEndImage2, setBackEndImage2)}
                                className='w-full text-[14px] sm:text-[18px]' />
                            {frontEndImage2 && <img src={frontEndImage2} alt="preview"
                                className='w-[120px] h-[80px] object-cover rounded-md' />}
                        </div>

                        <div className='flex items-start flex-col gap-[10px] w-full'>
                            <label className='text-[16px] sm:text-[20px]'>Image 3</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => handleImageChange(e, setFrontEndImage3, setBackEndImage3)}
                                className='w-full text-[14px] sm:text-[18px]' />
                            {frontEndImage3 && <img src={frontEndImage3} alt="preview"
                                className='w-[120px] h-[80px] object-cover rounded-md' />}
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">Rent</label>
                            <input type="text" value={rent}
                                onChange={(e) => setRent(e.target.value)}
                                className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] rounded-lg 
                                text-[15px] sm:text-[18px] text-black focus:outline-none focus:border-blue-500" required />
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">City</label>
                            <input type="text" value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] rounded-lg 
                                text-[15px] sm:text-[18px] text-black focus:outline-none focus:border-blue-500" required />
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">Landmark</label>
                            <input type="text" value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                                className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] rounded-lg 
                                text-[15px] sm:text-[18px] text-black focus:outline-none focus:border-blue-500" required />
                        </div>

                        <div className="flex items-start flex-col w-full">
                            <label className="text-[16px] sm:text-[20px] mb-[5px]">Category</label>
                            <select value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] rounded-lg 
                                text-[15px] sm:text-[18px] text-black focus:outline-none focus:border-blue-500" required>
                                <option value="">Select Category</option>
                                <option value="Vila">Vila</option>
                                <option value="Room">Room</option>
                                <option value="Pool House">Pool House</option>
                                <option value="Cabins">Cabins</option>
                                <option value="Shops">Shops</option>
                                <option value="Farm house">Farm house</option>
                                <option value="PG">PG</option>
                                <option value="Flat">Flat</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full sm:w-[150px] h-[45px] sm:h-[50px] text-[15px] sm:text-[18px] rounded-xl 
                            text-white bg-amber-600 disabled:opacity-60">
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            )}

            {BookingPopUp && (
                <div className='w-full min-h-screen flex items-center justify-center
                 flex-col gap-[20px] sm:gap-[30px] bg-[#ffffffcd] fixed top-[0px] z-[100] 
                 p-[16px] sm:p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px] overflow-y-auto'>

                    <RxCross1
                        className='w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] bg-[red] cursor-pointer fixed 
                        top-[16px] left-[16px] rounded-[50%] p-[5px] text-white z-[110]'
                        onClick={() => setBookingPopUp(false)}
                    />

                    <form className='max-w-[450px] w-full sm:w-[90%] max-h-[80vh] overflow-auto mt-[40px] md:mt-0
                    bg-[#f3f1f1] p-[16px] sm:p-[20px] rounded-lg flex items-center justify-start
                    flex-col gap-[10px] border-[1px] border-[#dedddd]'
                        onSubmit={(e) => { e.preventDefault(); handleBooking() }}>

                        <h1 className='w-[100%] flex items-center justify-center py-[10px]
                         text-[20px] sm:text-[25px] border-b-[1px] border-[#a3a3a3]'>
                            Confirm & Book
                        </h1>

                        <div className='w-[100%] p-[10px] sm:p-[20px] mt-[10px] gap-[15px] flex flex-col'>
                            <h1 className='text-[18px] sm:text-[22px] font-semibold'>Your Trip</h1>

                            <div className="flex items-start flex-col w-full mt-[13px]">
                                <label className="text-[16px] sm:text-[20px] mb-[5px]">Check In</label>
                                <input type="date" min={MinDate}
                                    className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] 
                                    rounded-lg text-[15px] sm:text-[18px] text-black" required
                                    onChange={(e) => setcheckIn(e.target.value)}
                                    value={checkIn} />
                            </div>

                            <div className="flex items-start flex-col w-full mt-[13px]">
                                <label className="text-[16px] sm:text-[20px] mb-[5px]">Check Out</label>
                                <input type="date" min={checkIn || MinDate}
                                    className="w-full h-[40px] sm:h-[45px] px-[15px] sm:px-[20px] border-[2px] 
                                    rounded-lg text-[15px] sm:text-[18px] text-black" required
                                    onChange={(e) => setcheckOut(e.target.value)}
                                    value={checkOut} />
                            </div>

                            <button type="submit"
                                className='w-full py-[10px] bg-[red] text-[white] 
                                text-[16px] sm:text-[18px] rounded-lg cursor-pointer mt-[10px]'>
                                Book Now
                            </button>
                        </div>
                    </form>

                    <div className='max-w-[450px] w-full sm:w-[90%] max-h-[80vh] overflow-auto 
                    bg-[#f3f1f1] p-[16px] sm:p-[20px] rounded-lg flex items-center justify-start
                    flex-col gap-[10px] border-[1px] border-[#dedddd]'>

                        <div className='w-[95%] border-[1px] border-[#dedddd] rounded-lg 
                        flex justify-center items-center gap-[8px] p-[12px] sm:p-[20px]'>
                            <div className='w-[60px] h-[80px] sm:w-[70px] sm:h-[90px] flex-shrink-0 rounded-lg'>
                                <img className='w-[100%] h-[100%] rounded-lg object-cover'
                                    src={cardDetails.image1} alt="" />
                            </div>
                            <div className='flex flex-col gap-[5px] min-w-0'>
                                <h1 className='text-[13px] sm:text-[16px] break-words'>{`In ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h1>
                                <h1 className='text-[13px] sm:text-[16px] break-words'>{cardDetails.title.toUpperCase()}</h1>
                                <h1 className='text-[13px] sm:text-[16px]'>{cardDetails.category.toUpperCase()}</h1>
                                <h1 className='flex items-center gap-[5px] text-[13px] sm:text-[16px]'>
                                    <FaStar className='text-[#eb6262]' /> 4.5
                                </h1>
                            </div>
                        </div>

                        <h1 className='text-[18px] sm:text-[22px] font-semibold w-full'>Booking Price</h1>

                        <p className='w-[100%] flex justify-between items-center px-[10px] sm:px-[20px] text-[14px] sm:text-[16px]'>
                            <span className='font-semibold'>
                                ₹{cardDetails.rent} x {Night} nights
                            </span>
                            <span>₹{cardDetails.rent * Night}</span>
                        </p>

                        <p className='w-[100%] flex justify-between items-center px-[10px] sm:px-[20px] text-[14px] sm:text-[16px]'>
                            <span>Airbnb Charge (7%)</span>
                            <span>₹{(cardDetails.rent * Night * 7 / 100).toFixed(2)}</span>
                        </p>

                        <p className='w-[100%] flex justify-between items-center px-[10px] sm:px-[20px] text-[14px] sm:text-[16px]'>
                            <span>Tax (7%)</span>
                            <span>₹{(cardDetails.rent * Night * 7 / 100).toFixed(2)}</span>
                        </p>

                        <div className='w-full border-t-[1px] border-gray-300 pt-[10px]
                        flex justify-between items-center px-[10px] sm:px-[20px] font-bold text-[16px] sm:text-[18px]'>
                            <span>Total</span>
                            <span>₹{Total ? Total.toFixed(2) : 0}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewCard