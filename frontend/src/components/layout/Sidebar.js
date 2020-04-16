import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Sidebar = ({username}) => {

  const sidebar = {
    backgroundColor: '#f7f7f7',
    width: '200px',
    height: '100%',
    position: 'fixed',
    flexDirection: 'column',
  }

  const justifyCenter = {
    display: 'flex',
    alignItems: 'center',
  }
  
  const sidebarTile = {
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '12%',
    marginTop: '2rem',
    width: '6rem',
    height: '6rem',
    fontSize: '30px',
    color: '#494949',
    border: 'transparent'
  }

  return (
    <div style={Object.assign(sidebar, justifyCenter)}>

      <Card style={Object.assign(sidebarTile, justifyCenter)}>
        <h2>{username}</h2>
      </Card>

      <Card style={Object.assign(sidebarTile, justifyCenter)}>
        <Link to="/">
          <i className="far fa-calendar-alt"></i>
          <h6 className="sidebar-links">Event</h6>
        </Link>
      </Card>

      <Card style={Object.assign(sidebarTile, justifyCenter)}>
        <Link to="/addNew">
          <i className="far fa-calendar-plus"></i>
          <h6 className="sidebar-links">New</h6>
        </Link>
      </Card>

      <Card style={Object.assign(sidebarTile, justifyCenter)}>
        <Link to="/facility">
          <i className="fas fa-user-cog"></i>
          <h6 className="sidebar-links">Facilties</h6>
        </Link>
      </Card>

      <Card style={Object.assign(sidebarTile, justifyCenter)}>
        <i className="fas fa-sign-out-alt"></i>
        <h6 className="sidebar-links">Logout</h6>
      </Card>

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