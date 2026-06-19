import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Notifications() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotifications = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/notification/get", { withCredentials: true })
            setNotifications(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const handleMarkRead = async (id) => {
        try {
            await axios.put(serverUrl + `/api/notification/read/${id}`, {}, { withCredentials: true })
            fetchNotifications()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-[100vw] min-h-[100vh] flex items-center justify-start 
        flex-col gap-[40px] relative px-[20px] pb-[50px]'>

            <div
                className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute
                 top-[5%] left-[20px] rounded-[50%] flex items-center justify-center'
                onClick={() => navigate("/")}>
                <FaArrowLeft className='w-[25px] h-[25px] text-[white]' />
            </div>

            <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c]
             p-[15px] flex items-center justify-center text-[30px] rounded-md 
             text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap'>
                Notifications
            </div>

            {loading ? (
                <p className='text-gray-400'>Loading...</p>
            ) : notifications.length === 0 ? (
                <p className='text-gray-400'>No notifications yet.</p>
            ) : (
                <div className='w-[90%] max-w-[700px] flex flex-col gap-[15px]'>
                    {notifications.map((n) => (
                        <div key={n._id}
                            className={`p-[15px] rounded-lg border-[1px] flex justify-between items-start gap-[10px]
                            ${n.isRead ? "bg-white border-gray-200" : "bg-yellow-50 border-yellow-300"}`}>
                            <div>
                                <p className='text-[15px]'>{n.message}</p>
                                <p className='text-[12px] text-gray-400 mt-[5px]'>
                                    {new Date(n.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {!n.isRead && (
                                <button
                                    className='text-[12px] px-[10px] py-[5px] bg-[#1a5c38] 
                                    text-white rounded-md whitespace-nowrap cursor-pointer'
                                    onClick={() => handleMarkRead(n._id)}>
                                    Mark Read
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Notifications