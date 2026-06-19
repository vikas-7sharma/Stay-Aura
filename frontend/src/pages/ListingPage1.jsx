import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { listingDataContext } from '../context/listingDataContext';

function ListingPage1() {
  const navigate = useNavigate()
    let {title,setTitle,
      description,setDescription,
      frontEndImage1,setFrontEndImage1,
      frontEndImage2,setFrontEndImage2,
      frontEndImage3,setFrontEndImage3,
      backEndImage1,setBackEndImage1,
      backEndImage2,setBackEndImage2,
      backEndImage3,setBackEndImage3,
      rent,setRent,
      city,setCity,
      landmark,setLandmark,
  category,setCategory }= useContext(listingDataContext)

  const handleimage1 = (e) =>{
    const file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  }
const handleimage2 = (e) =>{
  const file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  }
  const handleimage3 = (e) =>{
    const file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  }

  return (
    <div className='w-[100%] h-[100vh] relative'>

        
        <div className="w-[50px] h-[50px] justify-center items-center 
          rounded-[50%] absolute top-[5%] left-[5%] bg-red-500 flex cursor-pointer"
          onClick={() => navigate("/")}>
          <FaArrowLeft className="w-[25px] h-[25px] text-white" />
        </div>

    
        <div className='w-full h-full flex justify-center items-center'>
          <form action="" className='max-w-[700px] mt-[300px] w-[90%] flex flex-col 
          gap-[15px]'
           onSubmit={(e) => {
          e.preventDefault()
         navigate("/ListingPage2")
}}>

     <div className='absolute top-[5%] right-[2%] px-[20px] h-[45px] text-white 
          bg-red-500 flex justify-center items-center rounded-[30px] shadow-lg cursor-pointer
          text-[16px] font-medium'>
          SetUp Your Home
        </div>


            <div className="flex items-start flex-col w-full">
              <label htmlFor="title" className="text-[20px] mb-[5px]">Title</label>
              <input type="text" id="title" className="w-full h-[45px] px-[20px]
               border-[2px] rounded-lg text-[18px] focus:outline-none focus:border-blue-500"
                required onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </div>

            <div className="flex items-start flex-col w-full">
              <label htmlFor="des" className="text-[20px] mb-[5px]">Description</label>
              <textarea id="des" className="w-full h-[120px] px-[20px] py-[10px]
               border-[2px] rounded-lg text-[18px] resize-none focus:outline-none 
               focus:border-blue-500" required 
               onChange={(e)=>setDescription(e.target.value)} value={description}/>
            </div>

        <div className=' flex items-start justify-center
         flex-col gap-[10px]'>
          <label htmlFor='image1' className='text-[20px]'>Image1</label>
        <div className='flex items-center justify-start w-full h-[40px] border-[#555656] border-2 rounded-[10px]'>
         <input type="file" id='image1' className='w-[100%] text-[18px] px-[20px]'
         required onChange={handleimage1} />
           </div>
          </div>

          <div className=' flex items-start justify-center
         flex-col gap-[10px]'>
          <label htmlFor='image2' className='text-[20px]'>Image2</label>
        <div className='flex items-center justify-start w-full h-[40px] 
        border-[#555656] border-2 rounded-[10px]'>
         <input type="file" id='image2' className='w-[100%] text-[18px] px-[20px]'
         required onChange={handleimage2} />
           </div>
          </div>

          <div className=' flex items-start justify-center
         flex-col gap-[10px]'>
          <label htmlFor='image3' className='text-[20px]'>Image3</label>
        <div className='flex items-center justify-start w-full h-[40px]
         border-[#555656] border-2 rounded-[10px]'>
         <input type="file" id='image3' className='w-[100%] text-[18px] px-[20px]'
         required onChange={handleimage3} />
           </div>
          </div>


            <div className="flex items-start flex-col w-full">
              <label htmlFor="rent" className="text-[20px] mb-[5px]">Rent</label>
              <input type="text" id="rent" className="w-full h-[45px] px-[20px]
               border-[2px] rounded-lg text-[18px] focus:outline-none
                focus:border-blue-500" required
                 onChange={(e)=>setRent(e.target.value)} value={rent} />
            </div>
            
            <div className="flex items-start flex-col w-full">
              <label htmlFor="city" className="text-[20px] mb-[5px]">City</label>
              <input type="text" id="city" className="w-full h-[45px] px-[20px]
               border-[2px] rounded-lg text-[18px] focus:outline-none
                focus:border-blue-500" required  
                onChange={(e)=>setCity(e.target.value)} value={city}/>
            </div>
            
            <div className="flex items-start flex-col w-full">
              <label htmlFor="Landmark" className="text-[20px] mb-[5px]">Landmark</label>
              <input type="text" id="Landmark" className="w-full h-[45px] px-[20px]
               border-[2px] rounded-lg text-[18px] focus:outline-none
                focus:border-blue-500" required 
                 onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>
            </div>

             <button type="submit" className="w-[100px] h-[50px] text-[18px] 
              l-[10px] rounded-xl text-white 
         bg-amber-600" >Next</button>
          </form>
        </div>

    </div>
  )
}

export default ListingPage1