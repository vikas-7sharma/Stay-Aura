import React from 'react'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoAccessibilityOutline, IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { listingDataContext } from '../context/listingDataContext'
import { useContext } from 'react';
function ListingPage2() {
      const navigate = useNavigate()
      let {category,setCategory }= useContext(listingDataContext)
  return (
    <div  className='w-[100%] h-[100vh] flex justify-center items-center  
    overflow-auto'>
      <div className="w-[50px] h-[50px] justify-center items-center 
                rounded-[50%] absolute top-[5%] left-[5%] bg-red-500 flex cursor-pointer"
                onClick={() => navigate("/ListingPage1")}>
                <FaArrowLeft className="w-[25px] h-[25px] text-white" />
              </div>
       
          
     <div className='absolute top-[5%] right-[2%] px-[20px] h-[45px] text-white 
          bg-red-500 flex justify-center items-center rounded-[30px] shadow-lg cursor-pointer
          text-[16px] font-medium'>
          SetUp Your category
        </div>
        <div className='justify-start items-center m-w-[900px] h-[550px] w-[100%] 
        overflow-auto gap-[10px] flex flex-col mt-[30px]'>
            <h3 className='text-[18px] md:text-[30px]'>Choose a category for your place</h3>
    
    <div className='m-w-[900px] w-[100%] h-[600px] justify-center items-center flex 
          gap-[10px] md:w-[40%]  flex-wrap '>
        <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="vila" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("vila")}>
            <GiFamilyHouse className='w-[30px] h-[30px] text-black'/><h3>Vila</h3>
        </div>
                <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Room" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Room")}>
            <MdBedroomParent  className='w-[30px] h-[30px] text-black'/><h3>Room</h3>
        </div>

       <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Pool House" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Pool House")}>
            <MdOutlinePool className='w-[30px] h-[30px] text-black'/><h3>Pool House</h3>
        </div>

        <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Cabins" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Cabins")}>
            <GiWoodCabin className='w-[30px] h-[30px] text-black'/><h3>Cabins</h3>
        </div>

        <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Shop" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Shop")}>
            <SiHomeassistantcommunitystore className='w-[30px] h-[30px] text-black'/>
            <h3>Shop</h3>
        </div>

     
       <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Farm house" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Farm house")}>
            <FaTreeCity className='w-[30px] h-[30px] text-black'/><h3>Farm house</h3>
        </div>

        <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="Flat" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("Flat")}>
            <BiBuildingHouse className='w-[30px] h-[30px] text-black'/><h3>Flat</h3>
        </div>

       <div className={`w-[160px] h-[140px] justify-center items-center flex  flex-col
        text-[15px] cursor-pointer border-[2px] rounded-[30px] hover:border-[#a6a5a5] 
        ${category =="PG" ?"border-[#a6a5a5] border-3":""}`}
         onClick={()=>setCategory("PG")}>
            <IoBedOutline className='w-[30px] h-[30px] text-black'/><h3>PG</h3>
        </div>

    </div>
    </div>
     <button type="submit" className="w-[100px] h-[50px] text-[18px] rounded-xl text-white
         bg-amber-600 absolute right-[10%] bottom-[30px]" disabled={!category} 
         onClick={()=>navigate("/ListingPage3")}>Next</button>
    </div>
    
  )
}

export default ListingPage2
