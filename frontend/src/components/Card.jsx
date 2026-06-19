import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/listingDataContext'

function Card({ title, landmark, image1, image2, image3, rent, city, id, ratings }) {
    const images = [image1, image2, image3].filter(Boolean)
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { handleViewCard } = useContext(listingDataContext)

    const handleclick = () => {
        if (userData) {
            handleViewCard(id)
        } else {
            navigate("/login")
        }
    }

    const prev = (e) => {
        e.stopPropagation()
        setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))
    }

    const next = (e) => {
        e.stopPropagation()
        setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))
    }

    return (
        <div className='w-[330px] max-w-[85%] flex flex-col rounded-xl cursor-pointer'
            onClick={handleclick}>

            <div className='relative w-full h-[260px] rounded-xl overflow-hidden'>
                <div
                    className='flex h-full transition-transform duration-300 ease-in-out'
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`property-${i + 1}`}
                            className='w-full h-full flex-shrink-0 object-cover'
                        />
                    ))}
                </div>

                <button onClick={prev}
                    className='absolute left-2 top-1/2 -translate-y-1/2 
                    bg-white/80 hover:bg-white rounded-full w-7 h-7 
                    flex items-center justify-center shadow-md text-lg font-bold'>
                    ‹
                </button>

                <button onClick={next}
                    className='absolute right-2 top-1/2 -translate-y-1/2 
                    bg-white/80 hover:bg-white rounded-full w-7 h-7 
                    flex items-center justify-center shadow-md text-lg font-bold'>
                    ›
                </button>

                <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1'>
                    {images.map((_, i) => (
                        <span key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all 
                            ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            <div className='w-full py-3 flex flex-col gap-1'>
                <div className='flex items-center justify-between text-[18px]'>
                    <span className='w-[75%] truncate font-semibold text-[#4a3434]'>
                        In {landmark.toUpperCase()}, {city.toUpperCase()}
                    </span>
                    <span className='flex items-center gap-[2px]'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}
                                className={`text-[18px] ${star <= ratings ? 'text-[#eb6262]' : 'text-gray-300'}`}>
                                ★
                            </span>
                        ))}
                    </span>
                </div>
                <span className='text-[15px] w-[80%] truncate'>
                    {title.toUpperCase()}
                </span>
                <span className='text-[16px] font-semibold text-[#986b6b]'>
                    ₹{rent}/day
                </span>
            </div>
        </div>
    )
}

export default Card