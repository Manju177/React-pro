// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-4a1e6.firebaseapp.com",
  projectId: "realestate-4a1e6",
  storageBucket: "realestate-4a1e6.appspot.com",
  messagingSenderId: "530079953417",
  appId: "1:530079953417:web:24ed81b11c2f1e48a67ed8"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);