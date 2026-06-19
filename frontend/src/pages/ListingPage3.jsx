import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import { listingDataContext } from '../context/listingDataContext'
import  { useState } from 'react'

function ListingPage3() {
  const navigate = useNavigate()
  
  let { title, description,
        frontEndImage1, frontEndImage2, frontEndImage3,
        backEndImage1, backEndImage2, backEndImage3,
        rent, city, landmark, category,
        setTitle, setDescription,
        setFrontEndImage1, setFrontEndImage2, setFrontEndImage3,
        setBackEndImage1, setBackEndImage2, setBackEndImage3,
        setRent, setCity, setLandmark, setCategory, handlelisting
      } = useContext(listingDataContext)
      const [loading, setLoading] = useState(false)

  return (
    <div className='w-[100%] h-[100vh] justify-center items-center gap-[10px] flex
    flex-col overflow-auto bg-white relative'>
      
      <div className="w-[50px] h-[50px] justify-center items-center 
        rounded-[50%] absolute top-[5%] left-[5%] bg-red-500 flex cursor-pointer"
        onClick={() => navigate("/ListingPage2")}>
        <FaArrowLeft className="w-[25px] h-[25px] text-white" />
      </div>

      <div className='w-[95%] justify-start items-start text-[25px]
       md:w-[80%] mb-[10px]'>
        <h1 className='text-[20px] md:text-[30px] text-ellipsis
         text-[#272727] text-nowrap overflow-hidden'>
          {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
        </h1>
      </div>

      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col 
       md:w-[80%] md:flex-row'>
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex
         items-center justify-center border-[2px] border-[white]'>
          <img src={frontEndImage1} alt="" className='w-[100%]' />
        </div>
        <div className='w-[100%] h-[50%] flex items-center justify-center md:w-[50%] 
         md:h-[100%] md:flex-col'>
          <div className='w-[100%] h-[100%] overflow-hidden flex items-center
           justify-center border-[2px] border-[white]'>
            <img src={frontEndImage2} alt="" className='w-[100%]' />
          </div>
          <div className='w-[100%] h-[100%] overflow-hidden flex items-center
           justify-center border-[2px] border-[white]'>
            <img src={frontEndImage3} alt="" className='w-[100%]' />
          </div>
        </div>
      </div>

      <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
        {`${title.toUpperCase()} ${category.toUpperCase()} , ${landmark.toUpperCase()}`}
      </div>

      <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>
        {`${description.toUpperCase()}`}
      </div>

      <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
        {`Rs.${rent}/day`}
      </div>

     <button
    className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px]
    md:px-[100px] rounded-lg absolute right-[5%] bottom-[5%] cursor-pointer'
    onClick={handlelisting}
    disabled={loading}
>
    {loading ? "Adding..." : "Add Listing"}
</button>
    </div>
  )
}

export default ListingPage3