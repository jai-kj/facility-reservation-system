import React, { useState, useContext } from 'react'

import AlertContext from '../../context/alert/alertContext'

import { Col } from 'react-bootstrap'
import '../../css/login.css'
const Login = () => {
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext

  const [user, setUser] = useState({
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
      console.log('Login Button Pressed');
    }
  }

  return(
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <Col lg={12} className="d-flex mb-4 justify-content-center">
          <h3>Sign In</h3>
        </Col>
        <div className="user-box">
          <input type="text" name="svvID" value={svvID} onChange={onChange} placeholder="SVV ID" required />
          <label htmlFor="svvID">SVV ID</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <label htmlFor="password">Password</label>
        </div>
        <input 
          type="submit"
          value="Login"
          className="btn btn-dark mb-4"
        />
      </form>
    </div>
  )
}

export default Login;