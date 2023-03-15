// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAiOpQHO20FGIkb9AYi5JrU44MdEymsTMo",
  authDomain: "savethecode-a315c.firebaseapp.com",
  projectId: "savethecode-a315c",
  storageBucket: "savethecode-a315c.appspot.com",
  messagingSenderId: "476580439793",
  appId: "1:476580439793:web:5c51f3ad1cad08c7696b50",
  measurementId: "G-G0S5M1GHQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)

export {auth , firestore}