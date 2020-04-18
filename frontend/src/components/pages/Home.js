import React, { useContext, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from '../layout/Sidebar'
import Notification from '../layout/Notification'
import AuthContext from  '../../context/auth/authContext'

// import Profile from './Profile'
import ViewEvent from './ViewEvent'
import AddNew from './AddNew'
import Facility from './Facility'


const Home = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext

  const notify = useMemo(() => {
    if(user.designation !== 'Student')
      return <Notification />
    }, [user])
    
  return (
    <Router>
      <Sidebar />
      <div style=
        {{
          marginLeft: '200px',
          backgroundColor: '#ffffff',
          padding: '1.5rem'
        }}>
        {/* <Route exact path="/" component={Profile} user={user}/> */}
        <Route exact path="/" component={ViewEvent} />
        <Switch>
          <Route path="/addNew" component={AddNew} />
          <Route path="/facility" component={Facility} />
        </Switch>
      </div>
      {notify}
    </Router>
  )
}

export default Home