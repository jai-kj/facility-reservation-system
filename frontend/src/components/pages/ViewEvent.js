import React, { Fragment, useContext, useEffect, useCallback, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import moment from 'moment'

import ConditionLoading from '../layout/ConditionalLoading'
import Alerts from '../layout/Alerts'
import TimeTable from '../children/TimeTable'

import AlertContext from '../../context/alert/alertContext'
import FilterContext from '../../context/filters/filterContext'

import { useForm } from 'react-hook-form'
import { Row, Col } from 'react-bootstrap'
import '../../css/viewEvent.css'

const ViewEvent = () => {

  const alertContext = useContext(AlertContext)
  const filterContext = useContext(FilterContext)

  const { setAlert } = alertContext
  const { facilityData, types, getRooms, roomInfo, error, getTimetable, clearTimeTableData, timetable, getSingleFacility, facilityName } = filterContext

  useEffect(() => {
    facilityData() 
    clearTimeTableData()
    //eslint-disable-next-line
  }, [facilityData, clearTimeTableData])
  
  const [visibleFilter, setVisibleFilter] = useState({
    visibility: false,
    facility: '',
    roomNo: '',
    currentDate: '',
    nextDate: ''
  })
  const { register, handleSubmit, reset } = useForm()

  const { visibility, facility, currentDate, nextDate } = visibleFilter
    
  const facilitySelect = useCallback(async(event) => {
      var optionSelected = event.target.value
      if( event.target.name === 'facility' ){
        getRooms(optionSelected)
        setVisibleFilter({facility: optionSelected})
      }
      
      if( event.target.name === 'roomNo')
        getSingleFacility(optionSelected)

      clearTimeTableData()
      return
    }, [getRooms, getSingleFacility, setVisibleFilter, clearTimeTableData])

  const calcNextDateofWeek = (date) => {
    var someDate = moment(date)
    return someDate.clone().add(6, 'days').format().split('T')[0]    
  }

  const closeFilters = useCallback(() => {
    setVisibleFilter({visibility: false})
    reset()
    clearTimeTableData()
  }, [setVisibleFilter, reset, clearTimeTableData])

  const onSubmit = (e) => {
    if(e.facility === '' || e.roomNo === '' || e.currentDate === ''){
      setAlert('All Fields Required', 'danger')
      return
    }
    else if(error !== null) {
      setAlert(error, 'danger')
      return
    }
    else{
      //Calculating next 7 days
      var newDate = calcNextDateofWeek(e.currentDate)
      
      setVisibleFilter({
        visibility: true,
        facility: e.facility, 
        roomNo: e.roomNo, 
        currentDate: e.currentDate,
        nextDate: newDate
      })

      getTimetable({
        roomNo: e.roomNo, 
        currentDate: e.currentDate, 
        nextDate: newDate 
      })
    }
  }

  return (
    <Fragment>
      <h1>Ongoing Events</h1>
      <Alerts />
      <ConditionLoading isLoading={!types}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="no-gutters mt-5">

            <Col lg={3} className="d-flex flex-column">
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

            <Col lg={3} className="d-flex flex-column">
              <label>Room No</label>
              <select 
                className="filters"
                name="roomNo"
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

            <Col lg={3} className="d-flex flex-column">
              <label>Date</label>
              <input 
                type="date" 
                className="filters"
                name="currentDate"
                ref={register}
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
      {
        <CSSTransition
          in={visibility}
          timeout={300}
          classNames="alert"
          unmountOnExit  
        >
          <Row className="my-3 add-transition">
          <label className="filter-labels">
            {facility} {facilityName !== null ? facilityName : null}
          </label>
          <label className="filter-labels">
            {moment(currentDate, 'YYYY-MM-DD').format('D')+" "+moment(currentDate, 'YYYY-MM-DD').format('MMM')} - {moment(nextDate, 'YYYY-MM-DD').format('D')+" "+moment(nextDate, 'YYYY-MM-DD').format('MMM')}
          </label>
          <button className="btn btn-dark clear" type="submit" onClick={closeFilters} >Clear All</button>
          </Row>
        </CSSTransition>
      }
      <hr />
      {timetable === undefined || timetable.length === 0  ?
        (<div className='emptyTable'>
          <p className='text-secondary'>
            Select above Filters to view Ongoing Events in the Desired Facility
          </p>
        </div>)
        :(<TimeTable />)
      }
    </Fragment>
  )
}

export default ViewEvent