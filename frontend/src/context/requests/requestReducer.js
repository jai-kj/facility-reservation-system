import {
  GET_UNREAD_REQUESTS,
  GET_READ_REQUESTS,
  REQUESTS_ERROR,
  ADD_NEW_REQUEST,
  CLEAR_ADDED_REQUEST
} from '../types'

export default (state, action) => {
  switch(action.type) {
    case GET_UNREAD_REQUESTS: 
      return {
        ...state,
        unreadRequests: action.payload.data
      }

    case GET_READ_REQUESTS: 
      return {
        ...state,
        readRequests: action.payload.data
      }

    case ADD_NEW_REQUEST: 
      return {
        ...state,
        requestData: action.payload
      }

    case CLEAR_ADDED_REQUEST:
      return {
        ...state,
        requestData: null
      }
      
    case REQUESTS_ERROR: 
      return {
        ...state,
        error: action.payload
      } 

    default: 
    return state
  }
}