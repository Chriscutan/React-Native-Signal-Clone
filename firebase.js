import { initializeApp, getApp, getApps } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAamP2vz6c4CJ0s3HMxx_w63deil3VHfN4",
  authDomain: "signal-clone-react-nativ-cb494.firebaseapp.com",
  projectId: "signal-clone-react-nativ-cb494",
  storageBucket: "signal-clone-react-nativ-cb494.appspot.com",
  messagingSenderId: "1048526527783",
  appId: "1:1048526527783:web:9bea334f808b42710ddd02",
};

let app;

if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore();
const auth = getAuth();
const chatsRef = collection(db, "chats");

export { db, auth, chatsRef };
