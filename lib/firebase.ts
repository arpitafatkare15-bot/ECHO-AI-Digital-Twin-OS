import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDItu8UEGA0dnjdgAa2Q8C-3iKWJoI61cM",
  authDomain: "echo-digital-twin.firebaseapp.com",
  projectId: "echo-digital-twin",
  storageBucket: "echo-digital-twin.firebasestorage.app",
  messagingSenderId: "657622926644",
  appId: "1:657622926644:web:d185bf6dd9c35161815161",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

export default app;