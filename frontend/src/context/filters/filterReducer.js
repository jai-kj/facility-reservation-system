import {
  GET_FACILITY_TYPE_COMMITTEE,
  GET_ROOMS,
  GET_VACANT_SLOTS,
  FETCH_ROOMS_ERROR,
  FILTER_ERROR,
  TIME_SLOT_ERROR,
  REMOVE_TIME_SLOT,
  GET_TIMETABLE,
  TIMETABLE_ERROR
} from '../types'

export default (state, action) => {
  // console.log("action.payload", action.payload)
  switch(action.type) {
    case GET_FACILITY_TYPE_COMMITTEE:
      return {
        ...state,
        ...action.payload,
      }

    case GET_ROOMS:
      return {
        ...state,
        roomInfo: action.payload
      }

    case GET_VACANT_SLOTS:
      return {
        ...state,
        timeSlots: action.payload
      }
    
    case REMOVE_TIME_SLOT: 
      return {
        ...state,
        timeSlots: null
      }

    case GET_TIMETABLE:
      return {
        ...state,
        timetable: action.payload
      }
    
    case FILTER_ERROR:
    case FETCH_ROOMS_ERROR:
    case TIME_SLOT_ERROR:
    case TIMETABLE_ERROR:
      return{
        ...state,
        error: action.payload
      }

    default: 
      return state
    
  }
}