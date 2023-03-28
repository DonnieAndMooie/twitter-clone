// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI9hEJxKyLYNDJOxrVz2xrH-4yn-KuvYg",
  authDomain: "twitter-clone-b2e61.firebaseapp.com",
  projectId: "twitter-clone-b2e61",
  storageBucket: "twitter-clone-b2e61.appspot.com",
  messagingSenderId: "79392342301",
  appId: "1:79392342301:web:253ee6fee9c36715e661f4",
  measurementId: "G-E66QLGLCXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { app, db }