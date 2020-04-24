import {
  GET_ALL_FACILITIES,
  FETCH_FACILITIES_ERROR,
  FILTER_FACILITIES,
  CLEAR_FILTERED_FACILITIES,
  ADD_FACILITY,
  FACILITY_ERROR,
  CLEAR_FACILITY
} from '../types'

export default ( state, action ) => {
  switch(action.type) {

    case ADD_FACILITY:
      return {
        ...state,
        allFacilitiesData: [ action.payload, ...state.allFacilitiesData ]
      }

    case GET_ALL_FACILITIES:
      return {
        ...state, 
        allFacilitiesData: action.payload
      }

    case FILTER_FACILITIES:
      return {
        ...state,
        filteredFacilitiesData: state.allFacilitiesData.filter(facility => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return facility.facilityName.match(regex)
          || facility.facilityType.match(regex)
          || facility.facilityStartTime.match(regex)
          || facility.facilityEndTime.match(regex)
        })
      }

    case CLEAR_FACILITY:
      return {
        ...state,
        allFacilitiesData: null
      }

    case CLEAR_FILTERED_FACILITIES:
      return {
        ...state,
        filteredFacilitiesData: null
      }

    case FACILITY_ERROR:
    case FETCH_FACILITIES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}