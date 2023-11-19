// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyIhtPsSGpISbkd_As8Tz6WM0uBBs99qM",
  authDomain: "todo-7e5d9.firebaseapp.com",
  projectId: "todo-7e5d9",
  storageBucket: "todo-7e5d9.appspot.com",
  messagingSenderId: "743103479650",
  appId: "1:743103479650:web:b7233be6b3c5644f83f63b",
  measurementId: "G-Z9J9YDN5Q8"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence);