import {
  SELECT_EVENT,
  REMOVE_SELECTED_EVENT,
  ADD_TIME_SLOT,
  REMOVE_TIME_SLOT,
  CLEAR_TIME_SLOT
} from '../types'

export default (state, action) => {
  switch(action.type) {
    
    case SELECT_EVENT:
      return {
        ...state,
        eventSelectedID: action.payload,
      }
    
    case REMOVE_SELECTED_EVENT:
      return {
        ...state,
        eventSelectedID: '',
      }

    case ADD_TIME_SLOT:
      return {
        ...state,
        timeSchedule: [action.payload, ...state.timeSchedule]
      }

    case REMOVE_TIME_SLOT: 
      return {
        ...state,
        timeSchedule: state.timeSchedule.filter(slot => slot !== action.payload)
      }

    case CLEAR_TIME_SLOT: 
      return {
        ...state,
        timeSchedule: []
      }
    
    default:
      return state
  }
}