import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyDAyNhGtRPE7ErPdF8lDzNgPhjlGIuOn6U",
  authDomain: "otp-authentication-21a8b.firebaseapp.com",
  projectId: "otp-authentication-21a8b",
  storageBucket: "otp-authentication-21a8b.appspot.com",
  messagingSenderId: "50368349628",
  appId: "1:50368349628:web:59c76962e187a9ac0197b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default app;

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password){
  return signInWithEmailAndPassword(auth,email,password)
}

export function logout(){
  return signOut(auth)
}


export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user=>setCurrentUser(user))
    return unsub
  }, []);
  return currentUser;
}


