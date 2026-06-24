// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKLcGmYN68wC4CaDC3K5Z-ErKFSMGzjfo",
  authDomain: "magazin-periferice.firebaseapp.com",
  projectId: "magazin-periferice",
  storageBucket: "magazin-periferice.firebasestorage.app",
  messagingSenderId: "159524304121",
  appId: "1:159524304121:web:f83dc0fae6bcafdfb1de28",
  measurementId: "G-4SKV6BQ8VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);