// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwjhiieo-4jiLFCLCjQVwbvuQiX73qcTU",
    authDomain: "notebookfirebase-38d88.firebaseapp.com",
    projectId: "notebookfirebase-38d88",
    storageBucket: "notebookfirebase-38d88.appspot.com",
    messagingSenderId: "639632122505",
    appId: "1:639632122505:web:66a170ff2c1564bf20dc58"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);