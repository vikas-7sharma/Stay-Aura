import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Card from '../components/Card';
import { listingDataContext } from '../context/listingDataContext';  // CHANGED
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function MyListing() {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [myListings, setMyListings] = useState([])  
    const [loading, setLoading] = useState(true)       

    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                
                const result = await axios.get(
                    serverUrl + "/api/listing/mylist",  
                    { withCredentials: true }
                )
                setMyListings(result.data)
            } catch (error) {
                console.log("Error:", error.response?.status, error.response?.data)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMyListings()
    }, [])

   return (
    <div className='w-full min-h-screen flex flex-col items-center 
    gap-[30px] sm:gap-[50px] relative px-[16px] sm:px-[20px] pb-[50px] pt-[90px] sm:pt-[100px]'>

        <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] justify-center items-center 
                rounded-[50%] fixed top-[16px] left-[16px] bg-red-500 flex cursor-pointer z-20 shadow-md"
            onClick={() => navigate("/")}>
            <FaArrowLeft className="w-[18px] h-[18px] sm:w-[25px] sm:h-[25px] text-white" />
        </div>

        <div className='w-full max-w-[600px] border-[2px] border-[#908c8c] 
            px-[16px] py-[12px] sm:p-[15px] 
            flex items-center justify-center text-[18px] sm:text-[26px] md:text-[30px] rounded-md 
            text-[#613b3b] font-semibold text-center'>
            MY LISTING
        </div>

        {loading ? (
            <p className='text-gray-400'>Loading...</p>
        ) : myListings.length === 0 ? (
            <p className='text-gray-400'>No listings found.</p>
        ) : (
            <div className='w-[100%] flex items-center justify-center 
                gap-[20px] sm:gap-[25px] flex-wrap'>
                {myListings.map((list) => (
                    <Card
                        key={list._id}
                        title={list.title}
                        landmark={list.landmark}
                        city={list.city}
                        image1={list.image1}
                        image2={list.image2}
                        image3={list.image3}
                        rent={list.rent}
                        id={list._id}
                    />
                ))}
            </div>
        )}
    </div>
)
}

export default MyListing