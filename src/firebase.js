import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8kwkwCt2SvGc4our4fHDDT9F0biUlQ5Q",
  authDomain: "authentication-11506.firebaseapp.com",
  projectId: "authentication-11506",
  storageBucket: "authentication-11506.firebasestorage.app",
  messagingSenderId: "336350899743",
  appId: "1:336350899743:web:b9a29764e30c37c5aa2f2a",
  measurementId: "G-9BSVTCDKXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const googleProvider = new GoogleAuthProvider();
export default app;
