import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

export default (state, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token)
      return {
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
        loading: false
      }

    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}