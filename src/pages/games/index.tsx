import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Game from './[id]'

export default function Games () {
  return (
    <Switch>
      <Route path='/games/:id'>
        <Game />
      </Route>
    </Switch>
  )
}
