import React, { useReducer, useCallback } from 'react'
import axios from 'axios'

import FacilityContext from './facilityContext'
import facilityReducer from './facilityReducer'

import {
  GET_ALL_FACILITIES,
  FETCH_FACILITIES_ERROR,
  FILTER_FACILITIES,
  CLEAR_FILTERED_FACILITIES,
  ADD_FACILITY,
  FACILITY_ERROR,
  CLEAR_FACILITY
} from '../types'

const initialState = {
  allFacilitiesData: null,
  filteredFacilitiesData: null,
  current: null,
  error: null
}

const FacilityState = (props) => {

  const [ state, dispatch ] = useReducer( facilityReducer, initialState )

  const fetchAllFacilities = useCallback(async(svvID) => {
    try {
      const res = await axios.get(`/users/${svvID}/facilities?select=facilityName,facilityStartTime,facilityEndTime,facilityType&order=[["facilityName","ASC"]]&include=Time,Request&filter={"facilityStartTime":{"gte": "08:00"}}`)
      // console.log("fetchAllFacilities -> res", res.data)
      dispatch({
        type: GET_ALL_FACILITIES,
        payload: res.data.data
      })
    } catch (err) {
      // console.log("fetchAllFacilities -> err", err.response)
      dispatch({
        type: FETCH_FACILITIES_ERROR,
        payload: err.response.error
      })
    }
  }, []) 

  const filterFacilities = useCallback((text) => dispatch({ type: FILTER_FACILITIES, payload: text }), [])

  const clearFilteredFacilities = () => dispatch({type: CLEAR_FILTERED_FACILITIES})

  const addFacility = useCallback(async(facilityFormData)=> {
    console.log("addFacility -> facilityFormData", facilityFormData)
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    try {
      const res = await axios.post('/facilities', facilityFormData, config)
      console.log("addFacility -> res", res)
      dispatch({
        type: ADD_FACILITY,
        payload: res.data.data
      })
    } catch (err) {
      console.log("addFacility -> err", err)
      dispatch({
        type: FACILITY_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  const clearFacility = () => dispatch({ type: CLEAR_FACILITY})
  // const editFacility = useCallback( async(facilityName) => {
  //   const config = {
  //     header: {
  //       'Content-type': 'application/json'
  //     } 
  //   }

  //   const res = await axios.put()
  // }, [])

  return (
    <FacilityContext.Provider
      value={{
        allFacilitiesData: state.allFacilitiesData,
        filteredFacilitiesData: state.filteredFacilitiesData,
        error: state.error,
        current: state.current,
        fetchAllFacilities,
        filterFacilities,
        clearFilteredFacilities,
        addFacility,
        clearFacility
        // editFacility
      }}
    >
      {props.children}
    </FacilityContext.Provider>
  )
}

export default FacilityState
