// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArkcYDCe5vesUoVY5KAtiUlwuVoKTgIrs",
  authDomain: "new-moon-skin.firebaseapp.com",
  projectId: "new-moon-skin",
  storageBucket: "new-moon-skin.appspot.com",
  messagingSenderId: "340007373205",
  appId: "1:340007373205:web:040fb4bc9618cb7f30ce9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };