// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJEWu8oWhNkLshotDsvNMgOU5m2kUm3bQ",
    authDomain: "sanzamusicaward.firebaseapp.com",
    databaseURL: "https://sanzamusicaward-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sanzamusicaward",
    storageBucket: "sanzamusicaward.firebasestorage.app",
    messagingSenderId: "412196561128",
    appId: "1:412196561128:web:58dfba43da00ef8620e95d",
    measurementId: "G-LD30L92KYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
