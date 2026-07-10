import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2WM4uSTEIZxiyKeKmqPNom79qRyuy4_s",
  authDomain: "mylibrary-26ab5.firebaseapp.com",
  projectId: "mylibrary-26ab5",
  storageBucket: "mylibrary-26ab5.firebasestorage.app",
  messagingSenderId: "1093445581080",
  appId: "1:1093445581080:web:6d5878e7e6dc750103c66d",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);