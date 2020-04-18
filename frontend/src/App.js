import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login'
import Loading from './components/auth/Loading'
import Home from './components/pages/Home'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

import './App.css';

const App = () => {
  return (
    <AuthState>
      <AlertState>
          <Router>
            <Switch>
              <Route exact path="/loading" component={Loading} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
