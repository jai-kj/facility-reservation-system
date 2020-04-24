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
  
  const student = (<Fragment key='student'>
                      <div>
                        <NavLink exact to="/"
                        className="sidebar-tiles"
                        activeClassName="sidebar-tiles--active">
                          <div>
                            <i className="far fa-calendar-alt" />
                            <h6 className="sidebar-links">Event</h6>
                          </div>
                        </NavLink>
                      </div>
                    </Fragment>
                  )
  const staff= (<Fragment key='staff'>
                  <div>
                    <NavLink to="/addNew"
                    className="sidebar-tiles"
                    activeClassName="sidebar-tiles--active">
                      <div>
                        <i className="far fa-calendar-plus" />
                        <h6 className="sidebar-links">Manage</h6>
                      </div>
                    </NavLink>
                  </div>
                </Fragment> 
              )
  
  // const admin = (<Fragment key='admin'>
  //                 <div>
  //                   <NavLink to="/facility"
  //                   className="sidebar-tiles"
  //                   activeClassName="sidebar-tiles--active">
  //                     <div>
  //                       <i className="far fa-calendar-check" />
  //                       <h6 className="sidebar-links">Facilties</h6>
  //                     </div>
  //                   </NavLink>
  //                 </div>
  //               </Fragment>
  //             )

  const designation = useMemo(() => {
    switch(user.designation) {
      case 'Student':
        return [ student ]
      case 'Staff':
        return [ student, staff ]
      default:
        return [ student, staff ]
          // , admin ]
    }
  }, [user.designation, student, staff])

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
            <i className="fas fa-sign-out-alt" />
            <h6 className="sidebar-links">Logout</h6>
          </div>
        </a>
      </div>
  
    </div>
  )
}

export default Sidebar;