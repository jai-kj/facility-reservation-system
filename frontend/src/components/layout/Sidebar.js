import React, { useContext, useMemo, useCallback, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'
import '../../css/Sidebar.css'
const Sidebar = () => {

  const authContext = useContext(AuthContext)
  const { user, logout} = authContext
  
  const initials = useMemo(() => (
    user.name.toUpperCase().match(/\b(\w)/g).join('')
  ), [user.name])
  
  const designation = useMemo(() => {
    switch(user.designation) {
      case 'Student':
        return (
        <Fragment>
          <div>
            <NavLink exact to="/"
            className="sidebar-tiles"
            activeClassName="sidebar-tiles--active">
              <div>
                <i className="far fa-calendar-alt"></i>
                <h6 className="sidebar-links">Event</h6>
              </div>
            </NavLink>
          </div>
        </Fragment>
        )
      default:
        return (
        <Fragment>
          <div>
            <NavLink exact to="/"
            className="sidebar-tiles"
            activeClassName="sidebar-tiles--active">
              <div>
                <i className="far fa-calendar-alt"></i>
                <h6 className="sidebar-links">Event</h6>
              </div>
            </NavLink>
          </div>
          <div>
            <NavLink to="/addNew"
            className="sidebar-tiles"
            activeClassName="sidebar-tiles--active">
              <div>
                <i className="far fa-calendar-plus"></i>
                <h6 className="sidebar-links">New</h6>
              </div>
            </NavLink>
          </div>
          <div>
            <NavLink to="/facility"
            className="sidebar-tiles"
            activeClassName="sidebar-tiles--active">
              <div>
                <i className="fas fa-user-cog"></i>
                <h6 className="sidebar-links">Facilties</h6>
              </div>
            </NavLink>
          </div>
        </Fragment>
      )
    }
  }, [user.designation])

  const onLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <div className='sidebar'>

      <div className="sidebar-tiles profile">
        <h2>{initials}</h2>
      </div>
      {designation}
        {/* <NavLink exact to="/" 
          className="sidebar-tiles"
          activeClassName="sidebar-tiles--active"> */}
          {/* <div> */}
        {/* </NavLink>
      </div> */}
      <div>
        <a onClick={onLogout} href="#!"
        className="sidebar-tiles logout">
          <div>
            <i className="fas fa-sign-out-alt"></i>
            <h6 className="sidebar-links">Logout</h6>
          </div>
        </a>
      </div>
  
    </div>
  )
}

export default Sidebar;