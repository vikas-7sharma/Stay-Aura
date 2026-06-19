import React, { createContext, useState, useEffect, useContext } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {

    let { serverUrl } = useContext(authDataContext)
    let [userData, setUserData] = useState(null)
    let [loading, setLoading] = useState(true)  

    const getCurrentUser = async () => {

        try {
            
            let result = await axios.get(
                serverUrl + "/api/user/currentuser",
                { withCredentials: true }
            )
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
            console.log(error)
        } finally {
            setLoading(false) 
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    let value = { userData, setUserData, getCurrentUser, loading }  

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext