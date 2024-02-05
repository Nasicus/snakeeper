import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbYdobDsV0LkZbs2OpoHU0mAXBSehfVEw",
  authDomain: "snakeeper-c4f9d.firebaseapp.com",
  projectId: "snakeeper-c4f9d",
  storageBucket: "snakeeper-c4f9d.appspot.com",
  messagingSenderId: "987196495591",
  appId: "1:987196495591:web:4cd13a860ab339e5ff7442",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDb = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({}),
});

export function initializeFirebase() {
  // no need to do anything, since it's done above already
  // however this function is needed so we can "import" this file so something is executed
}
