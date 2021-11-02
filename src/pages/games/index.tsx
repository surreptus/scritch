import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Game from './[id]'
import Join from './join'
import Create from './create'

export default function Games () {
  return (
    <Switch>
      <Route path='/games/join'>
        <Join />
      </Route>

      <Route path='/games/create'>
        <Create />
      </Route>

      <Route path='/games/:id'>
        <Game />
      </Route>
    </Switch>
  )
}
