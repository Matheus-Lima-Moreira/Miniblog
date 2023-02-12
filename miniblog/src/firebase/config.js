import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz_nNyIdggUrKcly6GB69TOVF_L1wBKDk",
  authDomain: "miniblog-b9ad1.firebaseapp.com",
  projectId: "miniblog-b9ad1",
  storageBucket: "miniblog-b9ad1.appspot.com",
  messagingSenderId: "928416078654",
  appId: "1:928416078654:web:bfa336a403751297c6aa6f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };