// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkZKkRYykBFQ0tjhriR5Z2OsH8s0Hwr1Y",
  authDomain: "libertas-frontend.firebaseapp.com",
  projectId: "libertas-frontend",
  storageBucket: "libertas-frontend.appspot.com",
  messagingSenderId: "218538125324",
  appId: "1:218538125324:web:a9da72cda43a3414886629",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
