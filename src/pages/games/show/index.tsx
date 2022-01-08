import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import GameManager from 'contexts/game'

import Score from './score'
import Lobby from './lobby'
import Play from './play'

interface GameParams {
  id: string,
}
export default function Game() {
  const { id } = useParams<GameParams>()

  return (
    <GameManager gameId={id}>
      <Switch>
        <Route path='/games/:id/score'>
          <Score />
        </Route>

        <Route path='/games/:id/lobby'>
          <Lobby />
        </Route>

        <Route path='/games/:id'>
          <Play />
        </Route>
      </Switch>
    </GameManager>
  )
}
