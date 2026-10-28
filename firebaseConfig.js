import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUfFsMEIQfYY3zE-3DgX2NnjeLVRKJzjQ",
  authDomain: "banco-de-dados-b23a6.firebaseapp.com",
  projectId: "banco-de-dados-b23a6",
  storageBucket: "banco-de-dados-b23a6.firebasestorage.app",
  messagingSenderId: "822433975391",
  appId: "1:822433975391:web:de92e3a3a83feddcbe1fea",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
