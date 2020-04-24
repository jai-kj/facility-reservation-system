import React, { useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

import Alerts from '../layout/Alerts'

import { useForm } from 'react-hook-form'
import { Col } from 'react-bootstrap'
import '../../css/login.css'

const Login = props => {

  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext
    
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if(isAuthenticated){
      props.history.push("/")
    }
    else{
      if(error != null) {
        setAlert(error, 'danger')
        clearErrors()
      }
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const onSubmit = e => {
    login({
      svvID: e.svvID,
      password: e.password
    })
  }

  return(
    <>
      <div className="alerts">
        <Alerts />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col lg={12} className="d-flex mb-4 justify-content-center">
            <h3>Sign In</h3>
          </Col>
          <div className="user-box">
            <input type="text" name="svvID" ref={register} placeholder="SVV ID" required />
            <label htmlFor="svvID">SVV ID</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" ref={register} placeholder="Password" required />
            <label htmlFor="password">Password</label>
          </div>
          <input 
            type="submit"
            value="Login"
            className="btn btn-dark mb-4"
          />
        </form>
      </div>
    </>
  )
}

export default Login;