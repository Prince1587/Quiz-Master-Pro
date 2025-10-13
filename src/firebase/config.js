import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD61mTJfO3ropO6kJtjLbvyBpkkbv8q0gw",
  authDomain: "quiz-master-pro-5b999.firebaseapp.com",
  projectId: "quiz-master-pro-5b999",
  storageBucket: "quiz-master-pro-5b999.firebasestorage.app",
  messagingSenderId: "652325711581",
  appId: "1:652325711581:web:67605ec3dc20ac66393534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;