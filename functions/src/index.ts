import * as functions from "firebase-functions";
import { initializeApp } from '@firebase/app';
import * as db from "../db/repository"

const firebaseConfig = {
  apiKey: "AIzaSyDjKUdCRvNXalqrt1IUoHvZc_AYIMwawGc",
  authDomain: "scritch-4e385.firebaseapp.com",
  databaseURL: "https://scritch-4e385.firebaseio.com",
  projectId: "scritch-4e385",
  storageBucket: "scritch-4e385.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:196355494695:web:fe0ea5f9d9225d2888cf02",
  measurementId: "G-VJ2Z6B6BVS",
};

initializeApp(firebaseConfig);

export const createGame = functions.https.onCall(async(data) => {
  const gameId = await db.createGame();
  const player = await db.createPlayer(data.playerName, data.gameId);

  return {gameId: gameId, player: player};
});

export const joinGame = functions.https.onCall(async(data) => {
  const player = await db.createPlayer(data.playerName, data.gameId);

  return {player};
});
