import { initializeApp } from '@firebase/app';
import { getDatabase, connectDatabaseEmulator } from '@firebase/database';
import express from 'express';
import cors from 'cors';

export const app = express()
app.use(cors({ origin: true }));
app.use(express.json())

initializeApp({
  //apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "scritch-4e385.firebaseapp.com",
  databaseURL: "https://scritch-4e385.firebaseio.com",
  projectId: "scritch-4e385",
  storageBucket: "scritch-4e385.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:196355494695:web:fe0ea5f9d9225d2888cf02",
  measurementId: "G-VJ2Z6B6BVS",
});

export const db = getDatabase()

if (process.env.NODE_ENV != 'production') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, 'localhost', 9000);
}

