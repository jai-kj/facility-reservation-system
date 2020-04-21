import {
  ADD_NEW_EVENT,
  EVENT_ERROR,
  CLEAR_EVENT_ADDED,
  GET_USER_EVENTS,
  USER_EVENTS_ERROR
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case ADD_NEW_EVENT:
      return {
        ...state,
        userEvents: [action.payload],
        eventAdded: true
      }
    
    case GET_USER_EVENTS:
      return {
        ...state,
        userEvents: [...action.payload]
      }
    
    case EVENT_ERROR:
    case USER_EVENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        eventAdded: false
      }
  
    case CLEAR_EVENT_ADDED:
    return {
      ...state,
      eventAdded: false
    }
    
    default:
      return state
      
  }
}