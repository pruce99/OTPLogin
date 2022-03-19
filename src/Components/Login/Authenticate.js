
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDAyNhGtRPE7ErPdF8lDzNgPhjlGIuOn6U",
  authDomain: "otp-authentication-21a8b.firebaseapp.com",
  projectId: "otp-authentication-21a8b",
  storageBucket: "otp-authentication-21a8b.appspot.com",
  messagingSenderId: "50368349628",
  appId: "1:50368349628:web:59c76962e187a9ac0197b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app