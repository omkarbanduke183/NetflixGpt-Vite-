// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs6V_heXqDuNHr74I7NHVtLiDH_pqwVoM",
  authDomain: "netflixgptnew-f8f97.firebaseapp.com",
  projectId: "netflixgptnew-f8f97",
  storageBucket: "netflixgptnew-f8f97.firebasestorage.app",
  messagingSenderId: "852952834439",
  appId: "1:852952834439:web:d56bceeac405a5cdf1b322",
  measurementId: "G-98W6Q1NN4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)