import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkFO3ygRyzgmYv2o-qDe5UKhbKTUvQgvs",
  authDomain: "movies-app-4b606.firebaseapp.com",
  projectId: "movies-app-4b606",
  storageBucket: "movies-app-4b606.appspot.com",
  messagingSenderId: "507463976848",
  appId: "1:507463976848:web:bb4edf7b415951be3e5515",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
