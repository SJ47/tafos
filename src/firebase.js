import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// console.log("apiKey", app.options.apiKey);

export const auth = app.auth();  // gives us access to our firebase auth throughout our application
export default app;  // gives us access to firebase app throughout our application