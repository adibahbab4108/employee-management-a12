// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTCqhQP18rcTgtfWJa3uKD_L_2xlLJYFw",
  authDomain: "employee-management-3e084.firebaseapp.com",
  projectId: "employee-management-3e084",
  storageBucket: "employee-management-3e084.firebasestorage.app",
  messagingSenderId: "833553466796",
  appId: "1:833553466796:web:fc24ea20e6cb29dbeca609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);