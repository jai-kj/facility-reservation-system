import React, { useContext, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from '../layout/Sidebar'
import Notification from '../layout/Notification'

import RequestContext from '../../context/requests/requestContext'
import AuthContext from '../../context/auth/authContext'

import FilterState from'../../context/filters/FilterState'
import EventState from'../../context/events/EventState'
import SelectState from'../../context/select/SelectState'

// import Profile from './Profile'
import ViewEvent from './ViewEvent'
import AddNew from './AddNew'
import Facility from './Facility'

const Home = () => {

  const authContext = useContext(AuthContext)
  const { user } = authContext

  const requestContext = useContext(RequestContext)
  const { getAllUnreadReq, unreadRequests } = requestContext

  let mssgCount = 0
  if(unreadRequests){
    for(var i = 0; i < unreadRequests.length; i++){
      for(var j = 0; j < unreadRequests[i].requests.length; j++){
        mssgCount ++;
      }
    }
  }
  
  useEffect(() => {
    if(user && user.designation === 'Student')
      return
    else  
      getAllUnreadReq(user.svvID)
    }, [getAllUnreadReq, user])
  // console.log("Home -> prevState", prevState)


  const notify = useMemo(() => {
    if(user.designation !== 'Student')
      return <Notification count={unreadRequests && mssgCount}/>
    }, [user, unreadRequests, mssgCount])
    
  return (
    <FilterState>
      <EventState>
        <SelectState>
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
        </SelectState>
      </EventState>
    </FilterState>
  )
}

export default Home