// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlNvBdpI3u-VYiMIBTuU4ao4KgSEpmELc",
  authDomain: "qcare-b7741.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/u/0/project/qcare-b7741/database/qcare-b7741-default-rtdb/data/~2F",
  projectId: "qcare-b7741",
  storageBucket: "qcare-b7741.firebasestorage.app",
  messagingSenderId: "252454746421",
  appId: "1:252454746421:web:3a8f943d4285077757747c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
