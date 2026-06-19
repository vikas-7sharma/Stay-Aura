import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const authDataContext = createContext()

function AuthContext({ children }) {

    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/auth/check`, {
                    withCredentials: true 
                })
                setUserData(response.data.user)
            } catch (error) {
                setUserData(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const value = {
        serverUrl,
        userData,
        setUserData,
        loading
    }

    return (
        <authDataContext.Provider value={value}>
            {loading ? <div>Loading...</div> : children}
        </authDataContext.Provider>
    )
}

export default AuthContext