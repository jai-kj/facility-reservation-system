import React, { useReducer } from 'react'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

import AuthContext from './authContext'
import authReducer from './authReducer'
import {
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer( authReducer, initialState)

  //Register User
  
  //Load User @checks for which user is logged in to get user details
  const loadUser = async () => {
    // globally use token for accessing private routes
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    try {
      const res = await axios.get('/auth/me');
      
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      })
    }
  }
  //Login User
  const login = async formData => {
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    
    try {
      const res = await axios.post('/auth/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      })
    }
  }
  //Logout
  const logout = async() => {
    
    // window.location.reload()
    await axios.get('/auth/logout');
    dispatch({ type: LOGOUT })
    // dispatch({ type: LOGOUT })
  }

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


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
        loadUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;