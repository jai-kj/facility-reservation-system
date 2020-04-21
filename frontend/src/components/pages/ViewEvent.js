import React, { Fragment, useContext, useEffect, useCallback, useState } from 'react'
import moment from 'moment'

import ConditionLoading from '../layout/ConditionalLoading'
import Alerts from '../layout/Alerts'

import AlertContext from '../../context/alert/alertContext'
import FilterContext from '../../context/filters/filterContext'

import { Row, Col } from 'react-bootstrap'
import '../../css/viewEvent.css'

const ViewEvent = () => {

  const alertContext = useContext(AlertContext)
  const filterContext = useContext(FilterContext)

  const { setAlert } = alertContext
  const { facilityData, types, getRooms, roomInfo, error, getTimetable } = filterContext

  useEffect(() => {
    facilityData() 
  }
  //eslint-disable-next-line
  , [facilityData])

  const [filters, setFilters] = useState({
    'facility': '',
    'roomNo': '',
    'currentDate': '',
  })
  
  const onChange = useCallback(e => setFilters({ 
    ...filters,
      [e.target.name]: e.target.value,
    
    
  }), [filters, setFilters])

  const facilitySelect = useCallback(async(event) => {
      onChange(event)
      var optionSelected = event.target.value
      getRooms(optionSelected)
    }, [getRooms, onChange])


  const { facility, roomNo, currentDate } = filters

  const onSubmit = e => {
    e.preventDefault()
    if(facility === '' || roomNo === '' || currentDate === ''){
      setAlert('All Fields Required', 'danger')
      return
    }
    else if(error !== null) {
      setAlert(error, 'danger')
      return
    }
    else{
      //Calculating next 7 days
      var someDate = moment(currentDate);
      var nextDate = someDate.clone().add(1, 'week').format().split('T')[0]
      getTimetable({roomNo, currentDate, nextDate})
      // getTimetable({, nextDate})
    }
  }

  return (
    <Fragment>
      <h1>Ongoing Events</h1>
      <Alerts />
      <ConditionLoading isLoading={!types}>
        <form onSubmit={onSubmit}>
          <Row className="no-gutters mt-5">

            <Col lg={3} className="d-flex flex-column">
              <label>Facility</label>
              <select 
                className="filters" 
                name="facility"
                onChange={facilitySelect}
                required
                >
                <option value="" defaultValue >Choose a Facility</option>
                {types && types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Col>

            <Col lg={3} className="d-flex flex-column">
              <label>Room No</label>
              <select 
                className="filters"
                name="roomNo"
                onChange={onChange}
                required
                >
                <option value="" defaultValue>Choose a Room</option>
                {roomInfo && roomInfo.map(rooms => (
                  <option key={rooms.facilityID} value={rooms.facilityID}>{rooms.facilityName}</option>
                ))}
              </select>
            </Col>

            {/* <Col lg={3} className="d-flex flex-column">
              <label>Committee</label>
              <select 
                className="filters"
                name="committee"
                onChange={onChange}
                required
                >
              <option defaultValue value="">Choose a Committee</option>
              <option value='0'>No Committee</option>
                {committees && committees.map(committee => (
                  <option key={committee} value={committee}>{committee}</option>
                ))}
              </select>
            </Col> */}

            <Col lg={3} className="d-flex flex-column">
              <label>Date</label>
              <input 
                type="date" 
                className="filters"
                name="currentDate"
                onChange={onChange}
                required
              />
            </Col>

            <Col lg={3} className="d-flex flex-column">
              <label>Filter</label>
              <input 
                className="btn btn-expand-lg filters font-awesome" 
                style={{ backgroundColor: '#ff82a3', color: '#ffffff'}} 
                value="Search  &#xf002;"
                type="submit" 
              />
            </Col>

          </Row>  
        </form>
      </ConditionLoading>
      <hr className="mt-4"/>
    </Fragment>
  )
}

export default ViewEvent