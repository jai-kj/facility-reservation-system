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
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%', 
      transform: 'translate(-50%, -50%)'
    }}>
      <img src={loadingLogo} alt="Loading..." width="180px"/>
    </div>
  )
}

export default Loading
