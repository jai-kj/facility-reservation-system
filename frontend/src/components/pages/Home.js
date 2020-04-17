import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from '../layout/Sidebar'
import Alerts from '../layout/Alerts'
import Notification from '../layout/Notification'

import ViewEvent from './ViewEvent'
import AddNew from './AddNew'
import Facility from './Facility'

import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const authContext = useContext(AuthContext)
  
  useEffect(() => {
    authContext.loadUser()
    //eslint-disable-next-line
  }, [])

  return (
    <Router>
      <Fragment>
        <Alerts />
        <Sidebar username={'JJ'} />
        <div style=
          {{
            left: '200px', 
            position: 'absolute', 
            width: '100%',
            backgroundColor: '#ffffff'
          }}>
          <Switch>
            <Route exact path="/viewEvent" component={ViewEvent} />
            <Route exact path="/addNew" component={AddNew} />
            <Route exact path="/facility" component={Facility} />
          </Switch>
        </div>
        <Notification />
      </Fragment>
    </Router>
  )
}

export default Home