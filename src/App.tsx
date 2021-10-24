import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';

import Home from './pages'
import Games from './pages/games'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/games'>
          <Games />
        </Route>

        <Route>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
