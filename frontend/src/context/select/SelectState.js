import React, { useReducer, useCallback } from 'react'
import SelectContext from './selectContext'
import selectReducer from './selectReducer'

import {
  SELECT_EVENT,
  REMOVE_SELECTED_EVENT,
  ADD_TIME_SLOT,
  REMOVE_TIME_SLOT,
  CLEAR_TIME_SLOT
} from '../types'

const initialState = {
  eventSelectedID: '',
  timeSchedule: []
}

const SelectState = props => {

  const [ state, dispatch ] = useReducer( selectReducer, initialState )
  
  const selectEvent = useCallback((eventID) => {
    dispatch({
      type: SELECT_EVENT,
      payload: eventID
    })
  }, [])

  const removeSelectedEvent = useCallback(() => dispatch({ type: REMOVE_SELECTED_EVENT }), [])
  
  const addTimeSlot = useCallback((timeID) => {
    dispatch({
      type: ADD_TIME_SLOT,
      payload: timeID
    })
  }, [])

  const removeTimeSlot = useCallback((timeID) => {
    dispatch({
      type: REMOVE_TIME_SLOT,
      payload: timeID
    })
  }, [])

  const emptyTimeSlotsSelected = useCallback(() => dispatch({type: CLEAR_TIME_SLOT}), []) 
  return (
    <SelectContext.Provider 
      value={{
        eventSelectedID: state.eventSelectedID,
        timeSchedule: state.timeSchedule,
        selectEvent,
        removeSelectedEvent,
        addTimeSlot,
        removeTimeSlot,
        emptyTimeSlotsSelected
      }}
    >
      {props.children}
    </SelectContext.Provider>
  )
}

export default SelectState