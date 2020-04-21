import React, { useReducer, useCallback } from 'react'
import axios from 'axios'


import EventContext from './eventContext'
import eventReducer from './eventReducer'

import {
  ADD_NEW_EVENT,
  EVENT_ERROR,
  GET_USER_EVENTS,
  CLEAR_EVENT_ADDED,
  USER_EVENTS_ERROR
} from '../types'

const initialState = {
  eventAdded: false,
  error: null,
  userEvents: null
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
      // console.log("addEvent -> eventForm", eventForm)
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

  const resetEventAdded = useCallback(() => dispatch({ type: CLEAR_EVENT_ADDED }), [])

  return (
    <EventContext.Provider
      value={{
        userEvents: state.userEvents,
        eventAdded: state.eventAdded,
        error: state.error,
        addEvent,
        resetEventAdded,
        getUserEvents        
      }}
    >
      {props.children}
    </EventContext.Provider>
  )
}

export default EventState