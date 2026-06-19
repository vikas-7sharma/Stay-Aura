import { createContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./listingDataContext";
import { useContext } from "react";

export const bookingDataContext = createContext()
function BookingContext({children}){
    let [checkIn,setcheckIn] = useState("")
    let [checkOut,setcheckOut] = useState("")
    let [Total,setTotal] = useState(0)
    let [Night,setNight] = useState(0)
    let { serverUrl } = useContext(authDataContext);
let { getCurrentUser } = useContext(userDataContext);
let { getListing } = useContext(listingDataContext);

let [bookingData, setBookingData] = useState("");

const handleBooking = async (id) => {
  try {
    let result = await axios.post(
      serverUrl + `/api/booking/create/${id}`,
      {
        checkIn,
        checkOut,
        totalRent: total,
      },
      { withCredentials: true }
    );

    await getCurrentUser();
    await getListing();
    setBookingData(result.data)
  } catch (error) {
    setBookingData(null)
  }
};
    
    let value = {
      checkIn,setcheckIn,
      checkOut,setcheckOut,
      Total,setTotal,
      Night,setNight,
      bookingData,setBookingData,
      handleBooking
    }
    return(
        <div>
            <bookingDataContext.Provider value={value}>
                {children}
            </bookingDataContext.Provider>
        </div>
    )
}
export default BookingContext