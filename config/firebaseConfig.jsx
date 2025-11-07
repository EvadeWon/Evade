// app/config/firebaseConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHJjdoF0MmuFkpf6MvWDgVospXqowh2tM",
    authDomain: "evadewon-eebc6.firebaseapp.com",
    projectId: "evadewon-eebc6",
    storageBucket: "evadewon-eebc6.firebasestorage.app",
    messagingSenderId: "804765905101",
    appId: "1:804765905101:web:d2550aa2ee3d8a4bdd3984",
    measurementId: "G-EDSDZM7GD9"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export default app;
