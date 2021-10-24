import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Create from './create'

export default function Games () {
  return (
    <Switch>
      <Route path='/games/create'>
        <Create />
      </Route>
    </Switch>
  )
}
