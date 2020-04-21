import React, { useContext, useEffect, useCallback, useState } from 'react'

import ConditionLoading from '../layout/ConditionalLoading'
import EventRegistered from '../childcomponents/EventRegistered'
import EmptyTimeSlot from '../childcomponents/EmptyTimeSlot'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import FilterContext from '../../context/filters/filterContext'
import EventContext from '../../context/events/eventContext'
import SelectContext from '../../context/select/selectContext'
import RequestContext from '../../context/requests/requestContext'

import { Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../../css/viewEvent.css'

const AddRequest = () => {

  const filterContext = useContext(FilterContext)
  const { facilityData, types, getRooms, roomInfo, getEmptyTimeSlots, timeSlots, clearTimeSlots } = filterContext

  const eventContext = useContext(EventContext)
  const { getUserEvents, userEvents }  = eventContext

  const authContext = useContext(AuthContext)
  const { user } = authContext

  const selectContext = useContext(SelectContext)
  const { eventSelectedID, timeSchedule, emptyTimeSlotsSelected, removeSelectedEvent } = selectContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const requestContext = useContext(RequestContext)
  const { addNewRequest } = requestContext

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    clearTimeSlots()
    getUserEvents(user.svvID)
    facilityData() 
    //eslint-disable-next-line
  }, [ clearTimeSlots, getUserEvents, facilityData ])

  const [ timeFilter, setTimeFilter ] = useState({
    facility: '',
    facilityID: '',
    responseSlotDate: ''
  })
  const { facilityID, responseSlotDate } = timeFilter
  
  const onChange = useCallback(e => setTimeFilter({ 
    ...timeFilter,
    [e.target.name]: e.target.value,
  }), [timeFilter, setTimeFilter])

  const facilitySelect = useCallback(async(event) => {
    onChange(event)
    var optionSelected = event.target.value
    if( event.target.name === 'facility' ){
      getRooms(optionSelected)
      return
    }
    else if( event.target.name === 'facilityID' ){
      onChange(event)
      if(facilityID !== '' || responseSlotDate !== ''){
        emptyTimeSlotsSelected()
        getEmptyTimeSlots({
          facilityID: optionSelected,
          responseSlotDate: responseSlotDate
        })  
      }
      return
    }
    else if( event.target.name === 'responseSlotDate' ){
      onChange(event)
      if(facilityID !== '' || responseSlotDate !== ''){
        emptyTimeSlotsSelected()
        getEmptyTimeSlots({
          facilityID: facilityID,
          responseSlotDate: optionSelected
        })  
      }
        return
    }
  }, [ getRooms, onChange, responseSlotDate, facilityID, getEmptyTimeSlots ])

  const onSubmit = (e) => {
    if(eventSelectedID === ''){
      setAlert('Please select an Event first to make Request', 'danger')
      return
    }
    else if(timeSchedule.length === 0) {
      setAlert('Please select a Time Slot to make Request', 'danger')
      return
    }

    else{
      var min = (Math.min(...timeSchedule))
      var max = (Math.max(...timeSchedule))
      var requestSlotFrom = timeSlots.filter(slots => slots.timeID === min)[0].startTime
      var requestSlotTill = timeSlots.filter(slots => slots.timeID === max)[0].endTime
      if(requestSlotFrom === undefined || requestSlotTill === undefined){
        setAlert('Error in passing Time Slots', 'danger')
        return
      }

      addNewRequest(eventSelectedID, {
        facilityID: e.facilityID,
        requestSlotDate: e.responseSlotDate,
        requestSlotFrom: requestSlotFrom, 
        requestSlotTill: requestSlotTill,
        timeSchedule: timeSchedule
      })

      setAlert('New Request made to Facility Incharge Successfully', 'primary', 5000)
      reset()
      removeSelectedEvent()
      emptyTimeSlotsSelected()
      // }
    }
  }

  return (
    <form className="add-container" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={12} className="d-flex justify-content-center mb-3">
          <h3>Add New Request</h3>
        </Col>
        <Col md={7} style={{backgroundColor: '#ffffff', margin: '0', padding: '8px', height: '63vh'}}>
          <h4 className="mt-2 mb-3">Select an Event</h4>
          <div style={{position: 'relative', overflowY: 'scroll', height: '85%'}}>
            <ConditionLoading isLoading={!userEvents} >
              {( userEvents === null || userEvents.length === 0) ? 
                (<p className="empty text-secondary">You have no Events created.<br />Please create an Event to make a request</p>)
              : 
                userEvents && userEvents.map( event => 
                  (<EventRegistered
                    key={event.eventID}
                    eventID={event.eventID} 
                    eventName={event.eventName} 
                    eventUnder={event.eventUnder} 
                    eventDescription={event.eventDescription}
                  />)
                )
              }
            </ConditionLoading>
          </div>
        </Col>
        <ConditionLoading isLoading={!types}>
          <Col md={5}>
            <div>
  
              <Col md={12} className="d-flex flex-column mb-4">
                <label>Facility</label>
                <select 
                  className="filters" 
                  name="facility"
                  onChange={facilitySelect}
                  ref={register}
                  required
                  >
                  <option value="" defaultValue >Choose a Facility</option>
                  {types && types.map(type => (
                    <option key={type} value={type}>{type}</option>
                    ))}
                </select>
              </Col>
  
              <Row className="d-flex mb-4">
                <Col md={6} className="flex-column">
                  <label>Room No</label>
                  <select 
                    className="filters w-100"
                    name="facilityID"
                    onChange={facilitySelect}
                    ref={register}
                    required
                    >
                    <option value="" defaultValue>Choose a Room</option>
                    {roomInfo && roomInfo.map(rooms => (
                      <option key={rooms.facilityID} value={rooms.facilityID}>{rooms.facilityName}</option>
                      ))}
                  </select>
                </Col>
                <Col md={6} className="flex-column">
                  <label>Date</label>
                  <input 
                    type="date" 
                    className="filters w-100"
                    name="responseSlotDate"
                    ref={register}
                    onChange={facilitySelect}
                    required
                  />
                </Col>
              </Row>

              <Col md={12} className="mb-4">
                <label>Select Time</label>
                {
                  (timeSlots === null || timeSlots.length === 0) 
                  ? (<label className="h-100 ml-3 text-danger">Choose a Room and Date first</label>) 
                  : (<ConditionLoading isLoading={!timeSlots}>
                      <Row style={{fontSize: '15px'}}>
                      {
                        timeSlots && timeSlots.map(slots => (
                            <Col md={4} key={slots.timeID} className="mb-2">
                              <EmptyTimeSlot  
                                timeID={slots.timeID}
                                startTime={slots.startTime}
                                endTime={slots.endTime}
                              />
                            </Col>
                        ))
                      }
                      </Row>
                    </ConditionLoading>)
                }
                
              </Col>

              <Col md={12} className="d-flex justify-content-center mb-4">
                <input 
                  className="btn btn-dark" 
                  type="submit" 
                  value="Make Request"
                  style={{
                    width: '150px'
                  }}
                />
              </Col>
            </div>
          </Col>
        </ConditionLoading>
      </Row>
    </form>
  )
}

export default AddRequest
