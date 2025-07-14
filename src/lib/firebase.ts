// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY5XM-lO18Y1SdsN5TlwYQrC8gxvOhVb8",
  authDomain: "smart-commerce-27f6d.firebaseapp.com",
  projectId: "smart-commerce-27f6d",
  storageBucket: "smart-commerce-27f6d.firebasestorage.app",
  messagingSenderId: "993413035930",
  appId: "1:993413035930:web:d75b806c5fb8b53a57ec23",
  measurementId: "G-LC88VDSFF7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
