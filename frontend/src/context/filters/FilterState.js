import React, { useReducer, useCallback } from 'react'
// import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

import FilterContext from './filterContext'
import filterReducer from './filterReducer'

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

const initialState = {
  types: null,
  committees: null,
  // filterLoading: true,
  roomInfo: null,
  timeSlots: null,
  error: null,
  timetable: []
}

const FilterState = props => {
  
  const [state, dispatch] = useReducer( filterReducer, initialState)
  
  // if(!localStorage.token)
  //   return false;
  // const token = localStorage.token
  // setAuthToken(token)
  const facilityData = useCallback( async () => {

    try {
      const {data:{data:{types}}} = await axios.get("/facilities/types")
      // const {data:{data:{committees}}} = await axios.get("/events/committees")
      dispatch({
        type: GET_FACILITY_TYPE_COMMITTEE,
        payload: { types }
        // payload: {types, committees}
      })
      return true
    } catch(err){
      dispatch({
        type: FILTER_ERROR,
        payload: err.response.error
      })
      return false
    }
  }, [])

  const getCommittees = useCallback(async() => {
    try {
      const {data:{data:{committees}}} = await axios.get("/events/committees")
      dispatch({
        type: GET_FACILITY_TYPE_COMMITTEE,
        payload: { committees }
        // payload: {types, committees}
      })
      return true
    } catch (err) {
        dispatch({
          type: FILTER_ERROR,
          payload: err.response.error
        })
        return false
    }

  }, [])

  const getRooms = useCallback( async (facilityType) => {
    try {
      const res = await axios.get(`/facilities?filter={"facilityType":"${facilityType}"}`)
      // console.log("getRooms -> res", res.data.data)
      dispatch({
        type: GET_ROOMS,
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: FETCH_ROOMS_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  
  const getEmptyTimeSlots = useCallback( async (timeData) => {
    // console.log(timeData)
    try {
      const res = await axios.get(`/facilities/${timeData.facilityID}/timeslots/${timeData.responseSlotDate}`)
      // console.log("getEmptyTimeSlots -> res", res.data.data)
      dispatch({
        type: GET_VACANT_SLOTS,
        payload: res.data.data
      })
      return true
    } catch (err) {
      console.log("getEmptyTimeSlots -> err", err)
      dispatch({
        type: TIME_SLOT_ERROR,
        payload: err.response.error
      })
      return false
    }
  }, [])
  
  const clearTimeSlots = useCallback(() => dispatch({ type: REMOVE_TIME_SLOT }), [])

  const getTimetable = useCallback (async ({roomNo, currentDate, nextDate}) => {
    // console.log("getTimetable -> {roomNo, currentDate, nextDate}", {roomNo, currentDate, nextDate})
    // console.log("getTimetable -> {facilityID, initialDate, nextDate}", {facilityID, initialDate, nextDate})
    try {
      const res = await axios.get(`/facilities/${roomNo}/timetables/weekly/${currentDate}_${nextDate}`)
      console.log("getTimetable -> res", res)
      dispatch({
        type: GET_TIMETABLE,
        payload: res.data.data
      })
    } catch (err) {
      console.log("getTimetable -> err", err)
      dispatch({
        type: TIMETABLE_ERROR,
        dispatch: err.response.error
      })
    }
  }, [])

  return (
    <FilterContext.Provider
      value={{
        types: state.types,
        committees: state.committees,
        timetable: state.timetable,
        roomInfo: state.roomInfo,
        timeSlots: state.timeSlots,
        error: state.error,
        facilityData,
        getCommittees,
        getRooms,
        getEmptyTimeSlots,
        clearTimeSlots,
        getTimetable
      }}
    > {props.children}
    </FilterContext.Provider>
  )
}

export default FilterState