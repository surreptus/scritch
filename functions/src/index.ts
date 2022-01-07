import * as functions from "firebase-functions";
import express from 'express';
import { app } from './config/setup'

import * as game from './server/game';

const handleErrorResponse = (res: express.Response, error: Error, message: string) => {
  console.log(error)
  res.status(500).send(JSON.stringify({message, error: error.message}))
}

app.post('/games', async(req, res) => {
  try {
    const resp = await(game.createGame(req.body.playerName))
    res.send(JSON.stringify(resp));
  } catch (e) {
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
    await game.startGame(gameId)
    res.sendStatus(200)
  } catch (e) {
    handleErrorResponse(res, e, 'error starting game')
  }
})

app.post('/games/:gameId/rounds/:roundId/bid', async(req, res) => {
  const { gameId, roundId } = req.params
  const { playerId, bid } = req.body

  try {
    await game.bid(gameId, roundId, playerId, bid)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error creating bid')
  }
})

app.post('/games/:gameId/rounds/:roundId/tricks/create', async(req, res) => {
  const { gameId, roundId } = req.params
  try {
    await game.createTrick(gameId, roundId)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error creating trick')
  }
})

app.post('/games/:gameId/rounds/:roundId/tricks/:trickId/play', async(req, res) => {
  const { gameId, roundId, trickId } = req.params
  const { playerId, card } = req.body

  try {
    await game.play(gameId, roundId, trickId, playerId, card)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error creating move')
  }
})

app.post('/games/:gameId/rounds/:roundId/tricks/:trickId/score', async(req, res) => {
  const {gameId, roundId, trickId} = req.params;

  try {
    await game.scoreTrick(gameId, roundId, trickId)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error scoring trick')
  }
})

app.post('/games/:gameId/rounds/:roundId/score', async(req, res) => {
  const {gameId, roundId} = req.params;

  try {
    await game.scoreRound(gameId, roundId)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error scoring round')
  }
})

app.post('/games/:gameId/rounds/create', async(req, res) => {
  const {gameId} = req.params;

  try {
    await game.createRound(gameId)
    res.sendStatus(200)
  } catch(e) {
    handleErrorResponse(res, e, 'error creating round')
  }
})

export const api = functions.https.onRequest(app)
