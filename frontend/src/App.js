import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login'
import Loading from './components/auth/Loading'
import Home from './components/pages/Home'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import RequestState from './context/requests/RequestState'

import './css/App.css';

const App = () => {
  return (
    <AuthState>
      <RequestState>
        <AlertState>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/loading" component={Loading} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </Router>
        </AlertState>
      </RequestState>
    </AuthState>
  );
}

export default App;
