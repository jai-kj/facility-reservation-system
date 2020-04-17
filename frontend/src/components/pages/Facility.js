import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const Facility = () => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    authContext.loadUser()
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      <h1 className="p-3">Facility Page</h1>
    </div>
  )
}

export default Facility
