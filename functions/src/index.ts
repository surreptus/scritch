import * as functions from "firebase-functions";
import express from 'express';
import { app } from './config/setup'

import * as game from './server/game';

const handleErrorResponse = (res: express.Response, error: Error, message: string) => {
  res.status(500).send(JSON.stringify({message, error}))
}

app.post('/games', async(req, res) => {
  try {
    const resp = await(game.createGame(req.body.playerName))
    res.send(JSON.stringify(resp));
  } catch (e) {
    console.log("e", e)
    handleErrorResponse(res, e, 'error creating game')
  }
});

app.post('/games/:id/join', async(req, res) => {
  const { id: gameId } = req.params
  try {
    const resp = await(game.joinGame(req.body.playerName, gameId))
    res.send(JSON.stringify(resp));
  } catch (e) {
    handleErrorResponse(res, e, 'error creating player')
  }
});

app.post('/games/:id/start', async(req, res) => {
  const { id: gameId } = req.params

  try {
    const resp = await(game.startGame(gameId))
    res.send(JSON.stringify(resp))
  } catch (e) {
    handleErrorResponse(res, e, 'error starting game')
  }
})

export const api = functions.https.onRequest(app)
