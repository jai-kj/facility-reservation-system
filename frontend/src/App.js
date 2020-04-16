import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import Alerts from './components/layout/Alerts'
import Notification from './components/Notification'
import Login from './components/auth/Login'

import ViewEvent from './pages/ViewEvent'
import AddNew from './pages/AddNew'
import Facility from './pages/Facility'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

import './App.css';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Alerts />
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
            <Sidebar username="JJ"/>
            <div style=
              {{
                left: '200px', 
                position: 'absolute', 
                width: '100%',
              }}>
              <Switch>
                <Route exact path="/" component={ViewEvent} />
                <Route exact path="/addNew" component={AddNew} />
                <Route exact path="/facility" component={Facility} />
              </Switch>
            </div>
            <Notification />
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
