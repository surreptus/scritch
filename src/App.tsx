import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';

import Home from './pages'
import Games from './pages/games'

export default function App() {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}
