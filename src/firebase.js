// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlT6A0LIvwNoVKPFqxaDcKAtIbG1AQHvs",
    authDomain: "todo-9e3f5.firebaseapp.com",
    projectId: "todo-9e3f5",
    storageBucket: "todo-9e3f5.appspot.com",
    messagingSenderId: "87649021303",
    appId: "1:87649021303:web:68adfe9d4217307c1c0572",
    measurementId: "G-JHZG1W1P47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db }
