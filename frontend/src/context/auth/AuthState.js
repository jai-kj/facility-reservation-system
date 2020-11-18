import React, { useReducer, useCallback } from 'react'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

import AuthContext from './authContext'
import authReducer from './authReducer'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null
}

const AuthState = props => {
  
  const [state, dispatch] = useReducer( authReducer, initialState)

  //Load User Data on refresh
  const loginFromToken = useCallback(async () => {
    // globally use token for accessing private routes
    if(!localStorage.token)
      return false;

    try {
      const token = localStorage.token
      setAuthToken(token)     
      const {data:{data:user}} = await axios.get('/auth/me');
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {data:{token, user}}
      })
      return true;

    } catch (err) {
      localStorage.removeItem('token')
      return false;
    }
  }, [])

  //Login User
  const login = useCallback( async formData => {
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    
    try {
      //API call to get verified user's token
      const {data: {data:{token}}} = await axios.post('/auth/login', formData, config);

      //Sending user's token to get user info from API
      setAuthToken(token)     
      const {data:{data:user}} = await axios.get('/auth/me');
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {data:{token, user}}
      })
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      })
    }
  }, [])

  //Logout
  const logout = useCallback( async () => {
    await axios.get('/auth/logout');
    dispatch({ type: LOGOUT })
  }, [])

  //Clear Errors
  const clearErrors = useCallback( () => dispatch({ type: CLEAR_ERRORS }), [])

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        clearErrors,
        logout,
        loginFromToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;