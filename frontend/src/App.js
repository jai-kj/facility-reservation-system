import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import Home from './components/pages/Home'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

import './App.css';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Fragment>
          <Alerts />
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </Router>
        </Fragment>
      </AlertState>
    </AuthState>
  );
}

export default App;
