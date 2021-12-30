import { initializeApp } from '@firebase/app';
// import functions from 'firebase-functions';
import { getDatabase } from '@firebase/database';
import express from 'express';
import cors from 'cors';

export const app = express()
app.use(cors({ origin: true }));
app.use(express.json())

initializeApp(JSON.parse(process.env.FIREBASE_CONFIG as string));

export const db = getDatabase()
