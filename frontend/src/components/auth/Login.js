import React, { useState, useContext, useEffect, Fragment } from 'react'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

import Alerts from '../layout/Alerts'

import { Col } from 'react-bootstrap'
import '../../css/login.css'

const Login = props => {

  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext
    
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

  const [ user, setUser] = useState({
    svvID: '',
    password: ''
  });

  const { svvID, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if(svvID === '' || password === '') {
      setAlert('Please enter all fields', 'danger')
    }
    else{
      login({
        svvID,
        password
      })
    }
  }

  return(
    <Fragment>
      <div className="alerts">
        <Alerts />
      </div>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <Col lg={12} className="d-flex mb-4 justify-content-center">
            <h3>Sign In</h3>
          </Col>
          <div className="user-box">
            <input type="text" name="svvID" value={svvID} onChange={onChange} placeholder="SVV ID" />
            <label htmlFor="svvID">SVV ID</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <input 
            type="submit"
            value="Login"
            className="btn btn-dark mb-4"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Login;