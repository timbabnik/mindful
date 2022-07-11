import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBnE9NDF8VJufiJ1g9Ydf9F2XA3Dq_mQNM",
    authDomain: "mindfulfriend-9fe90.firebaseapp.com",
    projectId: "mindfulfriend-9fe90",
    storageBucket: "mindfulfriend-9fe90.appspot.com",
    messagingSenderId: "275445099689",
    appId: "1:275445099689:web:f873281f469fdf5f4dcdb8"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }