import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react';
import axios from 'axios'

import EventContext from '../../context/events/eventContext'
import ConditionalLoading from '../layout/ConditionalLoading'

const ShowEvent = (props) => {

  const { eventID, status, startTime, endTime } = props
  const eventContext = useContext(EventContext)
  const { colorCodes } = eventContext
  const[ eventDetails, setEventDetails ] = useState({})

  useEffect(() => {
    axios.get(`/events/${eventID}?include=User`)
    .then((res) => res.data.data).then((data) => {
      // console.log("ShowEvent -> data", data)
      setEventDetails(data)
    })
    .catch(err => console.log(err))
    //eslint-disable-next-line
  }, [eventID])
  // console.log("ShowEvent -> eventID", eventID)
  
  // const {singleEventDetails, getSingleEvent} = eventContext
  // useEffect(() => {
  //   // console.log("ShowEvent -> eventID", eventID)
  //   getSingleEvent(eventID)
  // }, [])
  return (
    <Tippy 
      theme="light" 
      trigger="click" 
      placement="bottom"
      interactive={true} 
      disabled={!eventDetails}
      content={
        <div style={{color: '#494949'}}>
          From {startTime} to {endTime}<br /><br />
          <h6>
            <b>Event Details</b></h6>
            Description: {eventDetails.eventDescription}<br />
            Event Under: {eventDetails.eventUnder}<br /><br />
            <h6><b>Incharge Details</b></h6>{
            eventDetails.incharge && Object.entries(eventDetails.incharge).map(Incharge => (
                <span key={Incharge[0]}>
                  {Incharge[0].charAt(0).toUpperCase()+Incharge[0].slice(1)}: {Incharge[1]}<br />
                </span>
              ))
            }
        </div>
      } 
    >
      <span className={status} style={{ backgroundColor: colorCodes[eventID[0]] }}>{
      !eventDetails ? status
        :
          (<ConditionalLoading isLoading={!eventDetails}>
            {eventDetails.eventName}
          </ConditionalLoading>)
      }
      </span>
    </Tippy> 
  )
}

ShowEvent.propTypes = {
  eventID: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
}

export default ShowEvent
