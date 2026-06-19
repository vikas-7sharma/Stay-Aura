import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ListingContext from './context/ListingContext.jsx'
import BookingContext from './context/BookingContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>        
      <UserContext>     
        <ListingContext>  
          <BookingContext>
            <App/>
          </BookingContext>
        </ListingContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)