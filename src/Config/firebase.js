// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYOxdDm7LUCTeC4h_FDY45SP4rYaVDNBY",
    authDomain: "movie-db-572b2.firebaseapp.com",
    projectId: "movie-db-572b2",
    storageBucket: "movie-db-572b2.appspot.com",
    messagingSenderId: "966183671281",
    appId: "1:966183671281:web:932b328756b2654ebe2050",
    measurementId: "G-8VJWCZQ19H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }