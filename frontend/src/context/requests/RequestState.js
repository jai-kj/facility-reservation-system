import React, { useReducer, useCallback } from 'react'
import axios from 'axios'

import RequestContext from './requestContext'
import requestReducer from './requestReducer'

import {
  GET_UNREAD_REQUESTS,
  GET_READ_REQUESTS,
  REQUESTS_ERROR,
  ADD_NEW_REQUEST,
  CLEAR_ADDED_REQUEST
} from '../types'

const initialState = {
  unreadRequests: null,
  readRequests: null,
  error: null,
  count: null,
  requestData: null
}

const RequestState = props => {

  const [ state, dispatch ] = useReducer( requestReducer, initialState )

  const getAllUnreadReq = useCallback( async(svvID) => {
    try {
      const res = await axios.get(`/users/${svvID}/requests?filter={"requestStatus":"Waiting"}&include=Event,Time`)
      // console.log("getAllUnreadReq -> res", res)
      dispatch({
        type: GET_UNREAD_REQUESTS,
        payload: res.data
      })
    } catch (err) {
      console.log("getAllUnreadReq -> err", err)    
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  const getAllReadReq = useCallback( async(svvID) => {
    try {
      const res = await axios.get(`/users/${svvID}/requests?filter={"requestStatus":["Alloted","Cancelled"]}&include=Event,Time`)
      // console.log("getAllReadReq -> res", res)
      dispatch({
        type: GET_READ_REQUESTS,
        payload: res.data
      })
    } catch (err) {
      console.log("getAllReadReq -> err", err)    
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.error
      })
    }
  }, [])

  const updateReqStatus = useCallback( async({facilityID, requestID}, updatedStatus, svvID, stateToBeCalled) => {
    // console.log("updateReqStatus -> {facilityID, requestID}, updatedStatus", {facilityID, requestID}, updatedStatus)
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    try {
      await axios.put(`/facilities/${facilityID}/requests/${requestID}`, updatedStatus, config)
      if(stateToBeCalled === 'Waiting')
        getAllUnreadReq(svvID)
      else
        getAllReadReq(svvID)
        getAllUnreadReq(svvID)
    } catch (err) {
      console.log("updateReqStatus -> err", err)
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.error
      })
    }
  }, [getAllReadReq, getAllUnreadReq])

  const addNewRequest = useCallback(async(eventID, reqData) => {
    const config = {
      header: {
        'Content-type': 'application/json'
      } 
    }
    try {
      const res = await axios.post(`/events/${eventID}/requests`, reqData, config)
      dispatch({
        type: ADD_NEW_REQUEST,
        payload: res.data
      })
      return true
    } catch (err) {
      dispatch({
        type: REQUESTS_ERROR,
        payload: err.response.error
      })
      return false
    }
  }, [])

  const clearAddedRequest = useCallback(() => dispatch({type: CLEAR_ADDED_REQUEST}), [])

  return (
    <RequestContext.Provider 
      value={{
        unreadRequests: state.unreadRequests,
        readRequests: state.readRequests,
        error: state.error,
        count: state.count,
        requestData: state.requestData,
        getAllUnreadReq,
        getAllReadReq,
        updateReqStatus,
        addNewRequest,
        clearAddedRequest
      }}
    >
      {props.children}
    </RequestContext.Provider>
  )
}

export default RequestState