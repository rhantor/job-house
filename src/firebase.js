// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA0fKUcFLn9o8OEZUcOrl7JFb6sJ9s1qRk",
  authDomain: "job-house-94edd.firebaseapp.com",
  projectId: "job-house-94edd",
  storageBucket: "job-house-94edd.appspot.com",
  messagingSenderId: "714984759964",
  appId: "1:714984759964:web:25e43466db12ed39eb4359",
  measurementId: "G-9HTH7FC9NY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
