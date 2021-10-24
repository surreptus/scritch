import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Create from './create'
import Game from './[id]'

export default function Games () {
  return (
    <Switch>
      <Route path='/games/create'>
        <Create />
      </Route>

      <Route path='/games/:id'>
        <Game />
      </Route>
    </Switch>
  )
}
