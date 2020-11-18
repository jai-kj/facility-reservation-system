import React, { useContext, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import Alerts from '../layout/Alerts'

import FacilityContext from '../../context/facility/facilityContext'
import FilterContext from '../../context/filters/filterContext'
import AlertContext from '../../context/alert/alertContext'
const FacilityForm = () => {

  const facilityContext = useContext(FacilityContext)
  const { addFacility, clearFacility } = facilityContext

  const filterContext = useContext(FilterContext)
  const { facilityData, types} = filterContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const { reset } = useForm()

  useEffect(() => {
    facilityData()
    //eslint-disable-next-line
  }, [facilityData])

  const [ facilityForm, setFacilityForm ] = useState({
    facilityName: '',
    facilityType: '',
    facilityStartTime: '',
    facilityEndTime: ''
  })

  const { facilityName, facilityType, facilityStartTime, facilityEndTime } = facilityForm
  
  let facilityTypeOptions = types && types.map(function(type){
    return {value: type, label: type}
  })
  
  const timeSlots = [
    { label: '08:00', value: '08:00'}, { label: '08:30', value: '08:30'},
    { label: '09:00', value: '09:00'}, { label: '09:30', value: '09:30'},
    { label: '10:00', value: '10:00'}, { label: '10:30', value: '10:30'},
    { label: '11:00', value: '11:00'}, { label: '11:30', value: '11:30'},
    { label: '12:00', value: '12:00'}, { label: '12:30', value: '12:30'},
    { label: '13:00', value: '13:00'}, { label: '13:30', value: '13:30'},
    { label: '14:00', value: '14:00'}, { label: '14:30', value: '14:30'},
    { label: '15:00', value: '15:00'}, { label: '15:30', value: '15:30'},
    { label: '16:00', value: '16:00'}, { label: '16:30', value: '16:30'},
    { label: '17:00', value: '17:00'}, { label: '17:30', value: '17:30'},
    { label: '18:00', value: '18:00'}
  ]
  
  const onChange = (e) => setFacilityForm({
    ...facilityForm,
    facilityName: e.target.value.trim()
    })
  
  const handleChange = (newValue) => {
    // console.log(newValue)
    if(newValue === null)
      setFacilityForm({ ...facilityForm , facilityType: newValue})
    else if(newValue.value === '')
      setAlert("Committee Name can't be Empty" , 'danger')
    else
      setFacilityForm({ ...facilityForm , facilityType: newValue.value.trim()})
    return
  }
    
  const handleChangeST = (newValue) => setFacilityForm({ ...facilityForm, facilityStartTime: newValue.value }) 
  const handleChangeET = (newValue) => setFacilityForm({ ...facilityForm , facilityEndTime: newValue.value})
  
  // const clearAll = () => { clearFacility() }

  const onSubmit = (e) => {
    e.preventDefault()
    if(facilityName === '' || facilityType === null || facilityType === '' || facilityStartTime === '' || facilityEndTime === '')
      setAlert('All Fields Required', 'danger')
    else if(facilityStartTime >= facilityEndTime)
      setAlert('End Time must be greater than Start Time', 'danger')
    else{
      console.log("FacilityForm -> facilityName, facilityType, facilityStartTime, facilityEndTime", facilityName, facilityType, facilityStartTime, facilityEndTime) 
      // addFacility(facilityForm)
      setAlert('Facility Added Successfully', 'success')
      setFacilityForm({
        facilityName: '',
        facilityType: '',
        facilityStartTime: '',
        facilityEndTime: ''
      })
    }
    // clearAll()
    return
  }

  return (
    <>
      <Alerts />
      <form style={{margin: '2rem 1rem'}} onSubmit={onSubmit}>
        <h3 className='d-flex justify-content-center text-dark'>Add Facility</h3>

        <Row className="my-3 d-flex flex-column">
          <label>Facility Type</label>
          <CreatableSelect
            isClearable
            placeholder="Select or Add Facility Type"
            name="facilityType"
            defaultValue={facilityType}
            onChange={handleChange}
            options={facilityTypeOptions}
          />
        </Row>

        <Row className="my-3 d-flex flex-column">
          <label>Facility Name</label>
          <input 
            type="text" 
            name="facilityName" 
            value={facilityName}
            placeholder="Enter facility name" 
            className="filters w-100"
            onChange={onChange}
            required
          />
        </Row>

        <Row className="my-3">
          <Col lg={6} style={{padding: '0'}}>
            <label>Start Time</label>
            <Select
              isClearable
              placeholder="Start Time"
              isClearable
              onChange={handleChangeST}
              options={timeSlots}
              name="facilityStartTime"
              defaultValue={facilityStartTime}
            />
          </Col>
          <Col lg={6} style={{padding: '0'}}>
            <label>End Time</label>
            <Select
              placeholder="EndTime"
              onChange={handleChangeET}
              options={timeSlots}
              name="facilityEndTime"
              value={facilityEndTime}
              />
          </Col>
        </Row>
        <button 
          className="btn btn-block mt-4 mb-3" 
          style={{backgroundColor: '#7377E8', color: '#ffffff'}}>
          Add Facility
        </button>
        {/* On Edit Functionality */}
        {/* <button 
          className="btn btn-block my-3" 
          style={{backgroundColor: '#f1f1f1'}}>
          Clear Form
        </button> */}
      </form>
    </>
  )
}

export default FacilityForm
