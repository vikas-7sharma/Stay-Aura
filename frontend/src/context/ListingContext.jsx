import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { listingDataContext } from './listingDataContext'
import { useNavigate } from 'react-router'

function ListingContext({ children }) {

    const { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [frontEndImage1, setFrontEndImage1] = useState(null)
    const [frontEndImage2, setFrontEndImage2] = useState(null)
    const [frontEndImage3, setFrontEndImage3] = useState(null)
    const [backEndImage1, setBackEndImage1] = useState(null)
    const [backEndImage2, setBackEndImage2] = useState(null)
    const [backEndImage3, setBackEndImage3] = useState(null)
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandmark] = useState("")
    const [category, setCategory] = useState("")
    const [ListingData, setListingData] = useState([])
    const [NewListingData, setNewListingData] = useState([])
    const [cardDetails, setCardDetails] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [listingReviews, setListingReviews] = useState([])

    const handlelisting = async () => {
        if (!title || !description || !city || !landmark || !rent || !category) {
            return alert("Please fill all fields")
        }

        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("city", city)
            formData.append("landmark", landmark)
            formData.append("rent", rent)
            formData.append("category", category)

            if (backEndImage1) formData.append("image1", backEndImage1)
            if (backEndImage2) formData.append("image2", backEndImage2)
            if (backEndImage3) formData.append("image3", backEndImage3)

            let result = await axios.post(
                serverUrl + "/api/listing/add",
                formData,
                { withCredentials: true }
            )

            setTitle("")
            setDescription("")
            setCity("")
            setLandmark("")
            setRent("")
            setCategory("")
            setFrontEndImage1(null)
            setFrontEndImage2(null)
            setFrontEndImage3(null)
            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)

            await getListing()
            navigate("/")
            console.log("result:", result.data)

        } catch (error) {
            console.log("error:", error.response?.data)
            alert(error.response?.data?.message || "Failed to add listing")
        } finally {
            setLoading(false)
        }
    }

    
    const handleupdatelisting = async (id) => {
        if (!title || !description || !city || !landmark || !rent || !category) {
            return alert("Please fill all fields")
        }

        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("city", city)
            formData.append("landmark", landmark)
            formData.append("rent", rent)
            formData.append("category", category)

            if (backEndImage1) formData.append("image1", backEndImage1)
            if (backEndImage2) formData.append("image2", backEndImage2)
            if (backEndImage3) formData.append("image3", backEndImage3)

            let result = await axios.put(
                serverUrl + `/api/listing/update/${id}`,
                formData,
                { withCredentials: true }
            )

            setCardDetails(result.data)
            await getListing()
            navigate("/myListing")

        } catch (error) {
            console.log("error:", error.response?.data)
            alert(error.response?.data?.message || "Failed to update listing")
        } finally {
            setLoading(false)
        }
    }

    const handleViewCard = async (id) => {
        try {
            const url = `${serverUrl}/api/listing/findlistingbyid/${id}`
            let result = await axios.get(url, { withCredentials: true })
            setCardDetails(result.data)
            navigate("/viewcard")
        } catch (error) {
            console.log(error)
        }
    }

    const getListing = async () => {
        try {
            let result = await axios.get(
                serverUrl + "/api/listing/get",
                { withCredentials: true }
            )
            setListingData(result.data)
            setNewListingData(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return

    setLoading(true)
    try {
        await axios.delete(serverUrl + `/api/listing/delete/${id}`, { withCredentials: true })
        await getListing()
        navigate("/myListing")
    } catch (error) {
        console.log(error)
        alert(error.response?.data?.message || "Failed to delete listing")
    } finally {
        setLoading(false)
    }
}


const getReviews = async (listingId) => {
    try {
        const result = await axios.get(serverUrl + `/api/review/listing/${listingId}`)
        setListingReviews(result.data)
    } catch (error) {
        console.log(error)
    }
}

const addReview = async (bookingId, rating, comment) => {
    try {
        await axios.post(serverUrl + "/api/review/add",
            { bookingId, rating, comment },
            { withCredentials: true }
        )
        return true
    } catch (error) {
        alert(error.response?.data?.message || "Failed to add review")
        return false
    }
}

    useEffect(() => {
        getListing()
    }, [])

    const value = {
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory,
        handlelisting,
        handleupdatelisting,  // ADDED
        loading,              // ADDED
        getListing,
        ListingData,
        setListingData,
        NewListingData,
        handleViewCard,
        cardDetails,
           handleDeleteListing,
           getReviews, listingReviews,
            addReview, 
    }

    return (
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>
    )
}

export default ListingContext