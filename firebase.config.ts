import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAeIZg7RL354y-DZ7WlnmsKv5XJdHnUtE",
  authDomain: "goal-tracker-app-38cdb.firebaseapp.com",
  projectId: "goal-tracker-app-38cdb",
  storageBucket: "goal-tracker-app-38cdb.appspot.com",
  messagingSenderId: "434647196205",
  appId: "1:434647196205:web:42e8c201a9ceb738a18ea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
