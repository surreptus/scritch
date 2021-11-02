import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Score from './score'
import Lobby from './lobby'
import Play from './play'

export default function Game() {
  return (
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
  )
}
