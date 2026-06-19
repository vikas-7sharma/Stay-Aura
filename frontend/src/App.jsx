
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import MyListing from './pages/MyListing.jsx'
import ViewCard from './pages/ViewCard.jsx'
import MyBooking from './pages/MyBooking.jsx'
import HostBookings from './pages/HostBookings.jsx'
import Notifications from './pages/Notification.jsx'

function App() {
    let { userData, loading } = useContext(userDataContext)

    // ✅ show nothing while checking auth status
    if (loading) return null  // or a spinner

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/ListingPage1' element={userData != null ? <ListingPage1 /> : <Navigate to="/" />} />
                <Route path='/ListingPage2' element={userData != null ? <ListingPage2 /> : <Navigate to="/" />} />
                <Route path='/ListingPage3' element={userData != null ? <ListingPage3 /> : <Navigate to="/" />} />
                <Route path='/MyListing' element={userData != null ? <MyListing /> : <Navigate to="/" />} />            
                <Route path='/ViewCard' element={userData != null ? <ViewCard /> : <Navigate to="/" />} />                        
                <Route path='/MyBooking' element={userData != null ? <MyBooking /> : <Navigate to="/" />} />                         
               <Route path="/hostbookings" element={<HostBookings />} />
               <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </>
    )
}
export default App
