import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbYdobDsV0LkZbs2OpoHU0mAXBSehfVEw",
  authDomain: "snakeeper-c4f9d.firebaseapp.com",
  projectId: "snakeeper-c4f9d",
  storageBucket: "snakeeper-c4f9d.appspot.com",
  messagingSenderId: "987196495591",
  appId: "1:987196495591:web:4cd13a860ab339e5ff7442",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(firebaseApp);

