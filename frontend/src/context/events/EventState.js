import React, { useReducer, useCallback } from 'react'
import axios from 'axios'

import EventContext from './eventContext'
import eventReducer from './eventReducer'

import {
  ADD_NEW_EVENT,
  EVENT_ERROR,
  GET_USER_EVENTS,
  CLEAR_EVENT_ADDED,
  USER_EVENTS_ERROR,
  FILTER_EVENTS,
  CLEAR_FILTERED_EVENTS,
  DELETE_EVENT
} from '../types'

const initialState = {
  eventAdded: false,
  error: null,
  userEvents: null,
  filteredEvents: null,
  colorCodes: {
    0: '#ffbcaf',
    1: '#b6e3ff',
    2: '#ffb2ff',
    3: '#e7b9ff',
    4: '#c0cfff',
    5: '#ffb2dd',
    6: '#b5ffff',
    7: '#baffff',
    8: '#dbffff',
    9: '#ecfffd',
    a: '#ccff90',
    b: '#ffffc2',
    c: '#ffd0b0',
    d: '#ffffb1',
    e: '#ffffb0',
    f: '#ffffb3'
  } 
}

const EventState = props => {
  const [ state, dispatch ] = useReducer( eventReducer, initialState )

  const addEvent = useCallback(async (eventForm) => {
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    try {
      const res = await axios.post('/events', eventForm, config)
      // console.log("addEvent -> res", res.data)
      dispatch({
        type: ADD_NEW_EVENT,
        payload: res.data.data
      })
    } catch (err) {
      // console.log("addEvent -> err", err)
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  const deleteEvent = useCallback(async(eventID) => {
    try {
      await axios.delete(`/events/${eventID}`)
      dispatch({
        type: DELETE_EVENT,
        payload: eventID
      })
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  const getUserEvents = useCallback( async (svvID) => {
    try {
      const res = await axios.get(`/users/${svvID}/events`)
      // console.log("getUserEvents -> res", res)
      dispatch({
        type: GET_USER_EVENTS,
        payload: res.data.data
      })
    } catch (err) {
      // console.log("getUserEvents -> err", err)
      dispatch({
        type: USER_EVENTS_ERROR,
        payload: err.response.error
      })
    }
  }, [])
  
  const resetEventAdded = () => dispatch({ type: CLEAR_EVENT_ADDED })

  const filterEvents = useCallback((text) => dispatch({ type: FILTER_EVENTS, payload: text }), [])

  const clearFilteredEvents = () => dispatch({type: CLEAR_FILTERED_EVENTS})

  return (
    <EventContext.Provider
      value={{
        userEvents: state.userEvents,
        eventAdded: state.eventAdded,
        error: state.error,
        colorCodes: state.colorCodes,
        filteredEvents: state.filteredEvents,
        addEvent,
        deleteEvent,
        resetEventAdded,
        getUserEvents,   
        filterEvents,
        clearFilteredEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  )
}

export default EventState