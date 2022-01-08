import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Game from './show'
import Join from './join'
import Create from './create'
import ApplicationManager from 'contexts/application'

export default function Games () {
  return (
    <ApplicationManager>
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
    </ApplicationManager>
  )
}
