import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIg72k7Xgo2z10Fnu6bV5asSat0M3xr54",
    authDomain: "stockify-a0ce2.firebaseapp.com",
    projectId: "stockify-a0ce2",
    storageBucket: "stockify-a0ce2.appspot.com",
    messagingSenderId: "568575660455",
    appId: "1:568575660455:web:5f98b5f164704014ed2682",
    measurementId: "G-L1EM4K70EB"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default app;
export { db };