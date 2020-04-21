import React, { useContext, useEffect } from 'react'

import FilterContext from '../../context/filters/filterContext'
import EventContext from '../../context/events/eventContext'
import AlertContext from '../../context/alert/alertContext'

import { useForm } from 'react-hook-form'
import { Row, Col } from 'react-bootstrap'

const AddEvent = () => {

  const eventContext = useContext(EventContext)
  const { addEvent, eventID, clearEventAdded } = eventContext  

  const filterContext = useContext(FilterContext)
  const {committees, getCommittees } = filterContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    getCommittees()
    //eslint-disable-next-line
  }, [getCommittees])

  useEffect(() => {
    if(eventID){
      clearEventAdded()
      return
    }
    //eslint-disable-next-line
  }, [clearEventAdded])
  
  const onSubmit = (e) => {
    if(e.eventName === '' || e.eventUnder === '' || e.eventDescription === ''){
      setAlert('All Fields Required', 'danger')
      return
    }
    addEvent(e)
    setAlert('Event Added Successfully', 'success', 5000)
    reset()
  }
  return (
      <form className="add-container" onSubmit={handleSubmit(onSubmit)}>
      
        <Col md={12} className="d-flex justify-content-center">
          <h3 className="mb-4">Add New Event</h3>
        </Col>
  
        <Row className="mb-4">
          <Col md={6} className="d-flex flex-column">
            <label>Event Name</label>
            <input 
              type="text" 
              name="eventName" 
              placeholder="Enter event name" 
              className="filters"
              ref={register}
              required
            />
          </Col>
          <Col md={6} className="d-flex flex-column">
            <label>Committee</label>
            <select 
              className="filters"
              name="eventUnder"
              ref={register}
              required
            >
              <option defaultValue value="">Choose a Committee</option>
              <option value='No Committee'>No Committee</option>
                {committees && committees.map(committee => (
                  <option key={committee} value={committee}>{committee}</option>
              ))}
            </select>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12} className="d-flex flex-column">
            <label>Event Description</label>
            <textarea 
              name="eventDescription" 
              placeholder="Enter event description" 
              className="filters desc" 
              ref={register}
            />
          </Col>
        </Row>
        
        <Col className="d-flex justify-content-center">
          <input 
            className="btn btn-dark" 
            type="submit" 
            value="Add"
            style={{
              width: '100px'
            }}
          />
        </Col>
        
      </form>
  )
}

export default AddEvent
