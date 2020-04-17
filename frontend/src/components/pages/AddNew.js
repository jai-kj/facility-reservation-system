import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const AddNew = () => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    authContext.loadUser()
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      <h1 className="p-3">Add New Page</h1>
    </div>
  )
}

export default AddNew
