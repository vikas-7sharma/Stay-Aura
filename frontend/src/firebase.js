import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoLSNg24CMYurwPsWEkprD9oxCLgdtjuM",
  authDomain: "airbnb-23fb5.firebaseapp.com",
  projectId: "airbnb-23fb5",
  storageBucket: "airbnb-23fb5.firebasestorage.app",
  messagingSenderId: "255215628377",
  appId: "1:255215628377:web:151ea7912b8a1fcde84148"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();