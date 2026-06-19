import { useContext, useEffect,useState } from 'react'
import aurastay from "../assets/aurastay.jpg"
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TfiMenu } from "react-icons/tfi";
import { SiTinder } from "react-icons/si";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/listingDataContext';
import { IoNotifications } from "react-icons/io5";
import axios from "axios"
import MyListing from '../pages/MyListing';
import MyBooking from '../pages/MyBooking';
function Navbar() {
    let [popup, setpopup] = useState(false);
    let [cate, setcate] = useState("trending");
    let [search, setSearch] = useState("");
    let navigation = useNavigate();
    let { serverUrl } = useContext(authDataContext)
    let { userData, getCurrentUser } = useContext(userDataContext)
    let { setListingData, NewListingData } = useContext(listingDataContext)

    useEffect(() => {
        if (search.trim() === "") {
            setListingData(NewListingData)
        }
    }, [search])

    const handleLogout = async () => {
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
            await getCurrentUser()
            navigation("/login");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleCategory = (category) => {
        setcate(category)
        setSearch("")
        if (category === "trending") {
            setListingData(NewListingData)
        } else {
            setListingData(
                NewListingData.filter(
                    (list) => list.category?.trim().toLowerCase() === category.trim().toLowerCase()
                )
            )
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (!search.trim()) {
            setListingData(NewListingData)
            return
        }
        setcate("trending")
        const query = search.trim().toLowerCase()
        setListingData(
            NewListingData.filter((list) =>
                list.city?.toLowerCase().includes(query) ||
                list.landmark?.toLowerCase().includes(query) ||
                list.title?.toLowerCase().includes(query)
            )
        )
    }

    const activeClass = "border-b-2 border-black"
    const itemClass = "items-center justify-center flex flex-col cursor-pointer hover:border-b-2 hover:border-[#a6a5a5] px-2 min-w-[60px]"

    const goTo = (path) => {
        userData ? navigation(path) : navigation("/login")
        setpopup(false)
    }

    return (
        <div className='fixed top-0 w-full z-50 shadow-sm bg-white'>

            <div className='w-full h-16 border-b px-4 items-center justify-between flex bg-white'>

                <div className='flex-shrink-0'>
                    <img src={aurastay} alt='AirBnb' className='w-[190px]' />
                </div>

                <form onSubmit={handleSearch} className='w-[45%] relative hidden md:block'>
                    <input
                        type='text'
                        className='w-full h-[46px] px-5 border-2 text-base
                         rounded-full border-[#bdbaba] focus:outline-none'
                        placeholder='Any Where | Any time | Any location'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className='w-9 h-9 bg-amber-600 flex items-center
                     justify-center rounded-full absolute right-2 top-[4px]'>
                        <FaSearch className='text-white text-sm' />
                    </button>
                </form>

                <div className='gap-2 flex justify-center items-center'>
                    <span
                        className='rounded-full px-3 py-2 text-sm font-medium
                         cursor-pointer hover:bg-[#ded9d9] hidden md:block whitespace-nowrap'
                        onClick={() => goTo("/ListingPage1")}>
                        List your home
                    </span>
                    <button
                        className='px-4 py-2 items-center justify-center flex
                        gap-2 border border-gray-300 bg-[#ded9d9] hover:shadow-lg rounded-full'
                        onClick={() => setpopup(prev => !prev)}>
                        {userData ? (
                            <span className='w-6 h-6 bg-red-500 text-white
                             rounded-full flex items-center justify-center font-bold text-xs'>
                                {userData.name?.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <CgProfile className='w-5 h-5' />
                        )}
                        <TfiMenu className='w-5 h-5' />
                    </button>
                    <button className='justify-center font-bold cursor-pointer'>
                        <IoNotifications className='w-5 h-5' onClick={() => goTo("/notifications")} />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSearch} className='w-full px-4 pb-3 pt-2 md:hidden bg-white'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        className='w-full h-11 pl-5 pr-14 border-2 text-sm
                         rounded-full border-[#bdbaba] focus:outline-none'
                        placeholder='Any Where | Any time | Any location'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className='w-8 h-8 bg-amber-600 flex items-center
                    justify-center rounded-full absolute right-2 top-[6px]'>
                        <FaSearch className='text-white text-xs' />
                    </button>
                </div>
            </form>

            <div className='w-full overflow-x-auto bg-white px-3 scrollbar-hide'>
                <div className='flex gap-4 justify-start md:justify-center min-w-max md:min-w-0 py-1'>

                    <div className={`${itemClass} ${cate === "trending" ? activeClass : ""}`}
                        onClick={() => handleCategory("trending")}>
                        <SiTinder className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Trending</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "vila" ? activeClass : ""}`}
                        onClick={() => handleCategory("vila")}>
                        <GiFamilyHouse className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Vila</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Room" ? activeClass : ""}`}
                        onClick={() => handleCategory("Room")}>
                        <MdBedroomParent className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Room</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Pool house" ? activeClass : ""}`}
                        onClick={() => handleCategory("Pool house")}>
                        <MdOutlinePool className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Pool house</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Cabins" ? activeClass : ""}`}
                        onClick={() => handleCategory("Cabins")}>
                        <GiWoodCabin className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Cabins</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Shops" ? activeClass : ""}`}
                        onClick={() => handleCategory("Shops")}>
                        <SiHomeassistantcommunitystore className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Shops</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Farm house" ? activeClass : ""}`}
                        onClick={() => handleCategory("Farm house")}>
                        <FaTreeCity className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Farm house</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "PG" ? activeClass : ""}`}
                        onClick={() => handleCategory("PG")}>
                        <IoBedOutline className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>PG</h3>
                    </div>

                    <div className={`${itemClass} ${cate === "Flat" ? activeClass : ""}`}
                        onClick={() => handleCategory("Flat")}>
                        <BiBuildingHouse className='w-6 h-6 sm:w-7 sm:h-7' />
                        <h3 className='text-xs mt-1 whitespace-nowrap'>Flat</h3>
                    </div>

                </div>
            </div>

            {popup && (
                <div className='w-52 bg-white border border-gray-200 shadow-xl
                 rounded-2xl right-3 sm:right-6 absolute top-[70px] z-10 overflow-hidden'>
                    <ul className='w-full flex flex-col py-2 text-[15px]'>
                        {userData ? (
                            <li className='hover:bg-gray-100 cursor-pointer px-5 py-2 font-medium'>
                                Hi, {userData.name}
                            </li>
                        ) : (
                            <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                                onClick={() => { navigation("/login"); setpopup(false) }}>
                                Login
                            </li>
                        )}
                        <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                            onClick={() => handleLogout()}>
                            Logout
                        </li>
                        <div className='w-full h-px bg-gray-200 my-1'></div>

                        <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                            onClick={() => goTo("/ListingPage1")}>
                            List your home
                        </li>
                        <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                            onClick={() => goTo("/MyListing")}>
                            My listing
                        </li>
                        <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                            onClick={() => goTo("/MyBooking")}>
                            My Booking
                        </li>
                        <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                            onClick={() => goTo("/notifications")}>
                            Notifications
                        </li>
                        {userData?.listing?.length > 0 && (
                            <li className='hover:bg-gray-100 cursor-pointer px-5 py-2'
                                onClick={() => goTo("/hostbookings")}>
                                Bookings on My Properties
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar