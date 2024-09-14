// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuaB_fag5e5t36jrLH5Orljx195oJkzSo",
  authDomain: "otp-verify-3389f.firebaseapp.com",
  projectId: "otp-verify-3389f",
  storageBucket: "otp-verify-3389f.appspot.com",
  messagingSenderId: "213792770534",
  appId: "1:213792770534:web:dd5e062ae033ceb323ae27",
  measurementId: "G-LETWZFS4FQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
