import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF7gcovDNb9i3ZV8RqEYS7I3frpnkpb0U",
  authDomain: "voting-cfce7.firebaseapp.com",
  projectId: "voting-cfce7",
  storageBucket: "voting-cfce7.appspot.com",
  messagingSenderId: "640268728913",
  appId: "1:640268728913:web:8bff956b76dbdf8ac61670",
  measurementId: "G-WFKWJHTVKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
