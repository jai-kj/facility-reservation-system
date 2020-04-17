import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'
import '../../css/Sidebar.css'
const Sidebar = ({ username }) => {

  const authContext = useContext(AuthContext)

  // const {isAuthenticated, logout, user, loadUser } = authContext
  
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, [])
  
  const onLogout = () => {
    authContext.logout()
  } 

  return (
    <div className='sidebar'>

      <div>
        <NavLink exact to="/" 
          className="sidebar-tiles"
          activeClassName="sidebar-tiles--active">
          <div>
            <h2>{username}</h2>
          </div>
        </NavLink>
      </div>

      <div>
        <NavLink to="/viewEvent"
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

      <div>
        <a onClick={onLogout} href="#!"
        className="sidebar-tiles">
          <div>
            <i className="fas fa-sign-out-alt"></i>
            <h6 className="sidebar-links">Logout</h6>
          </div>
        </a>
      </div>

    </div>
  )
}

Sidebar.propTypes = {
  username: PropTypes.string.isRequired
}

Sidebar.defaultProps = {
  username: 'Dev'
}
export default Sidebar;