import React, { useContext } from "react"
import Navbar from "../components/navbar"
import Card from "../components/Card"
import { listingDataContext } from '../context/listingDataContext'
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"

const Home = () => {
    const { ListingData } = useContext(listingDataContext)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-wrap w-full flex-1 justify-center 
            items-start gap-4 sm:gap-6 pt-[195px] md:pt-[145px] px-3 sm:px-6 pb-10">

                {!ListingData ? (
                    <p className="text-gray-400">Loading...</p>
                ) : ListingData.length === 0 ? (
                    <p className="text-gray-400">No listings found.</p>
                ) : (
                    ListingData.map((list) => (
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
                            ratings={list.rating}
                            IsBooked={list.IsBooked}
                            host={list.host}
                        />
                    ))
                )}
            </div>

            <footer className="w-full bg-[#f3ead7] text-[#5c4632] mt-auto border-t border-[#e0d3b8]">
                <div className="max-w-[1100px] mx-auto px-[20px] sm:px-[40px] py-[40px] 
                flex flex-col sm:flex-row justify-between gap-[30px]">

                    <div className="flex flex-col gap-[8px]">
                        <h2 className="text-[24px] font-semibold tracking-wide text-[#4a3434]">AuraStay</h2>
                        <p className="text-[13px] text-[#7a6a58] max-w-[250px]">
                            Find your perfect stay, anywhere, anytime.
                        </p>
                        <div className="flex gap-[12px] mt-[10px]">
                            <a href="#" aria-label="Instagram"
                                className="w-[36px] h-[36px] rounded-full bg-[#e8dcc3] flex items-center 
                                justify-center hover:bg-[#dcccac] transition">
                                <FaInstagram className="text-[16px] text-[#5c4632]" />
                            </a>
                            <a href="#" aria-label="Facebook"
                                className="w-[36px] h-[36px] rounded-full bg-[#e8dcc3] flex items-center 
                                justify-center hover:bg-[#dcccac] transition">
                                <FaFacebookF className="text-[16px] text-[#5c4632]" />
                            </a>
                            <a href="#" aria-label="Twitter"
                                className="w-[36px] h-[36px] rounded-full bg-[#e8dcc3] flex items-center 
                                justify-center hover:bg-[#dcccac] transition">
                                <FaTwitter className="text-[16px] text-[#5c4632]" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <h3 className="text-[15px] font-semibold text-[#4a3434] mb-[4px]">Company</h3>
                        <a href="#" className="text-[14px] text-[#7a6a58] hover:text-[#4a3434] transition">About Us</a>
                        <a href="#" className="text-[14px] text-[#7a6a58] hover:text-[#4a3434] transition">Contact</a>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <h3 className="text-[15px] font-semibold text-[#4a3434] mb-[4px]">Support</h3>
                        <a href="#" className="text-[14px] text-[#7a6a58] hover:text-[#4a3434] transition">Help Center</a>
                        <a href="#" className="text-[14px] text-[#7a6a58] hover:text-[#4a3434] transition">Safety Information</a>
                    </div>

                </div>

                <div className="border-t border-[#e0d3b8] py-[15px] px-[20px] text-center">
                    <p className="text-[13px] text-[#7a6a58]">
                        © {new Date().getFullYear()} AuraStay. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home