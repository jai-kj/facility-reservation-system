import {
  ADD_NEW_EVENT,
  EVENT_ERROR,
  CLEAR_EVENT_ADDED,
  GET_USER_EVENTS,
  USER_EVENTS_ERROR,
  FILTER_EVENTS,
  CLEAR_FILTERED_EVENTS,
  DELETE_EVENT
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case ADD_NEW_EVENT:
      return {
        ...state,
        userEvents: [action.payload],
        eventAdded: true
      }
    
    case DELETE_EVENT:
      return {
        ...state,
        userEvents: state.userEvents.filter(event => event.eventID !== action.payload)
      }

    case GET_USER_EVENTS:
      return {
        ...state,
        userEvents: [...action.payload]
      }
    
    case FILTER_EVENTS:
      return {
        ...state,
        filteredEvents: state.userEvents.filter(event => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return event.eventName.match(regex) 
            || event.eventDescription.match(regex) 
            || event.eventIncharge.match(regex) 
            || event.eventUnder.match(regex)
        })
      }
    
    case CLEAR_FILTERED_EVENTS:
      return {
        ...state,
        filteredEvents: null
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