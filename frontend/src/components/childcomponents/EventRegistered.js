import React, { useState, useContext } from 'react'
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types'

import EventContext from '../../context/events/eventContext'
import SelectContext from '../../context/select/selectContext'

const EventRegistered = ({ eventID, eventName, eventUnder, eventDescription }) => {

  const [ visible, setVisible ] = useState(false)

  const selectContext = useContext(SelectContext)
  const { eventSelectedID, selectEvent, removeSelectedEvent }  = selectContext

  const eventContext = useContext(EventContext)

  const eventStatus = () => {
    if(eventSelectedID !== eventID)
      selectEvent(eventID)
    else
      removeSelectedEvent(eventID)
  }

  const onDelete = () => {
    if(!window.confirm("Are you sure to Delete this Event"))
      return
    // console.log('Button Pressed')
    eventContext.deleteEvent(eventID)
  }
  
  var activeClass = {}
  if(eventID === eventSelectedID){
    activeClass = {
      border: '2px solid blue'
    }
  }

  return (
    <div 
      className="card" 
      style={Object.assign({padding: '1rem'}, activeClass)}
    >
      <div className="d-flex flex-row">
        <h6
          onClick={() => setVisible(!visible)}
          style={{ cursor: 'pointer'}}
        >
          {eventName}
        <i className="fas fa-caret-down" style={{padding: '2px 5px'}}/>
        </h6>

        {/* <Tippy
          interactive={true}
          content="Select Event"
        > */}
          <i className={`far fa-check-circle checkbox`}
          onClick={eventStatus} /> 
          {
            (eventID === eventSelectedID) 
            ? (<Tippy content='Event Selected'>
                <i className={`far fa-check-circle checkbox true`} onClick={eventStatus} />
              </Tippy>) 
            : (<Tippy content='Select Event'>
                <i className={`far fa-check-circle checkbox`} onClick={eventStatus} />
              </Tippy>)
          }
        {/* </Tippy> */}

        <Tippy content="Delete Event">
          <i className="fas fa-trash delete-bin text-danger" onClick={onDelete}/>
        </Tippy>

      </div>
      {visible ? 
        (<ul className="list-group" style={{fontSize: '14px'}}>
          <li className="list-group-item">Event Under: {eventUnder}</li>
          <li className="list-group-item">Description: {eventDescription}</li>
        </ul>) 
      : null}
    </div>
  )
}

EventRegistered.propTypes = {
  eventID: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  eventUnder: PropTypes.string.isRequired
}

export default EventRegistered
