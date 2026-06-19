import { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)

  let [show, setshow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setError] = useState("")

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain at least 1 number"
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least 1 special character (!@#$%^&*)"
    return null
  }

  const handlelogin = async (e) => {
    try {
      e.preventDefault()
      setError("")
      if (!validateEmail(email)) return setError("Please enter a valid email address")
      const passError = validatePassword(password)
      if (passError) return setError(passError)
      await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      await getCurrentUser()
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError("")
      const result = await signInWithPopup(auth, googleProvider)
      const { displayName, email } = result.user
      await axios.post(serverUrl + "/api/auth/google", { name: displayName, email }, { withCredentials: true })
      await getCurrentUser()
      navigate("/")
    } catch (error) {
      console.error("Google login error:", error)
      setError(error.message || "Google login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">

      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] justify-center items-center 
        rounded-full absolute top-4 left-4 bg-amber-600 flex cursor-pointer shadow-md"
        onClick={() => navigate("/")}>
        <FaArrowLeft className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] text-white" />
      </div>

      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg px-6 py-10 
      sm:px-10 flex flex-col gap-4">

        <h1 className="text-[22px] md:text-[28px] font-semibold text-gray-800">
          Welcome to Aura Stay
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[16px] md:text-[18px] text-gray-700">
            Email
          </label>
          <input type="text" id="email"
            className="w-full h-[44px] px-4 border-2 rounded-lg text-[16px] 
            focus:outline-none focus:border-amber-500"
            required onChange={(e) => setEmail(e.target.value)} value={email}
            placeholder="Enter your email" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[16px] md:text-[18px] text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"} id="password"
              className="w-full h-[44px] px-4 pr-[45px] border-2 rounded-lg text-[16px]
              focus:outline-none focus:border-amber-500"
              required onChange={(e) => setPassword(e.target.value)} value={password}
              placeholder="Enter your password"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setshow(prev => !prev)}>
              {show ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </span>
          </div>
        </div>

        {error && (
          <div className="w-full flex items-center gap-2 bg-red-50 border border-red-300 
          text-red-600 text-[14px] px-4 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <button type="button" onClick={handlelogin}
          className="w-full h-[48px] text-[16px] md:text-[18px] rounded-xl 
          text-white bg-amber-600 hover:bg-amber-700 transition font-medium">
          Login
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-[13px]">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button type="button" onClick={handleGoogleLogin}
          className="w-full h-[48px] flex items-center justify-center gap-3 
          border-2 border-gray-200 rounded-xl text-[15px] md:text-[16px] font-medium 
          hover:bg-gray-50 transition cursor-pointer">
          <img src="https://www.google.com/favicon.ico" className="w-[20px] h-[20px]" alt="google" />
          Continue with Google
        </button>

        <p className="text-[15px] md:text-[16px] text-center text-gray-600">
          You don't have an account?{" "}
          <span className="text-red-500 cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/Signup")}>Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default Login