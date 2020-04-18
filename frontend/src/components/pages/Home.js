import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from '../layout/Sidebar'
import Notification from '../layout/Notification'
import AuthContext from  '../../context/auth/authContext'

// import Profile from './Profile'
import ViewEvent from './ViewEvent'
import AddNew from './AddNew'
import Facility from './Facility'



const Home = () => {
  return (
    <Router>
      <Sidebar />
      <div style=
        {{
          left: '200px', 
          position: 'absolute', 
          width: '100%',
          backgroundColor: '#ffffff'
        }}>
        {/* <Route exact path="/" component={Profile} user={user}/> */}
        <Route exact path="/" component={ViewEvent} />
        <Switch>
          <Route path="/addNew" component={AddNew} />
          <Route path="/facility" component={Facility} />
        </Switch>
      </div>
      <Notification />
    </Router>
  )
}

export default Home