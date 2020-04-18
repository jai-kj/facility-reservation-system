import React, { useContext, useEffect } from 'react'
import loadingLogo from '../../resources/loading.gif' 
import AuthContext from '../../context/auth/authContext'

const Loading = (props) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loginFromToken } = authContext

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push("/")
    } else {

      loginFromToken().then((response=>{
        if(!response)
          props.history.push("/login")
        else
          props.history.push("/")
      }))
    }
  }, [loginFromToken, isAuthenticated, props.history ])

  return (    
    <div className="d-flex justify-content-center align-content-center">
      <img src={loadingLogo} alt="Loading..." />
    </div>
  )
}

export default Loading
