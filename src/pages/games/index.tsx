import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Game from './show'
import Join from './join'
import Create from './create'
import ApiTest from './api-test'

export default function Games () {
  return (
    <Switch>
      <Route path='/games/api-test'>
        <ApiTest />
      </Route>

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
