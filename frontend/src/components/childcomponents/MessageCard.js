import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import RequestContext from '../../context/requests/requestContext'
const MessageCard = (props) => {

  const { value, svvID, facilityID, requestID, requestStatus, requestDate, requestTiming, facilityName, eventName, eventUnder, eventIncharge, eventDescription } = props
  
  const requestContext = useContext(RequestContext)
  const { updateReqStatus } = requestContext
  
  const [ visible, setVisible ] = useState(false)
  var name = eventIncharge.split('.')

  const acceptRequest = useCallback(() => updateReqStatus(
    {facilityID, requestID}, 
    { 'requestStatus': 'Alloted' },
    svvID, requestStatus), [facilityID, requestID, svvID, requestStatus, updateReqStatus])
  
  const cancelRequest = useCallback(() => updateReqStatus(
    {facilityID, requestID}, 
    { 'requestStatus': 'Cancelled' },
    svvID, requestStatus), [facilityID, requestID, svvID, requestStatus, updateReqStatus])

  const waitRequest = useCallback(() => updateReqStatus(
    {facilityID, requestID}, 
    { 'requestStatus': 'Waiting' },
    svvID, requestStatus), [facilityID, requestID, svvID, requestStatus, updateReqStatus])

  return (
    <div className="card card-body">
      <div className="d-flex flex-row">
        <h5
          onClick={() => setVisible(!visible)}
          style={{ cursor: 'pointer'}}
        >
          Request for allotment of {facilityName}
          <i className="fas fa-caret-down" style={{padding: '2px 5px'}}/>
        </h5>
        <label
          className={
            'badge ' +
            (requestStatus === 'Waiting' ? 'badge-warning'
            : (requestStatus === 'Alloted' ? 'badge-success' : 'badge-secondary'))
            + ' badge-status'
          }
        >
          {requestStatus}
        </label>
      </div>
      {visible ? 
        (<ul className="list-group mt-2" style={{fontSize: '16px'}}>
          <li className="list-group-item">Event Name: <b>{eventName}</b></li>
          <li className="list-group-item">Description: <b>{eventDescription}</b></li>
          <li className="list-group-item">Event Date and Time: On <b>{requestDate}</b> From <b>{requestTiming}</b></li>
          <li className="list-group-item">Event Under: <b>{eventUnder}</b></li>
          <li className="list-group-item">Event Incharge: <b>{name[0].charAt(0).toUpperCase()+name[0].slice(1)} {name[1].charAt(0).toUpperCase()+name[1].slice(1)}</b></li>
          <div className="d-flex justify-content-center mt-3">
            {value === 'Unread' ? 
              (<>
                <button className="btn btn-success mx-2" type="button" onClick={acceptRequest}>Accept</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={cancelRequest}>Reject</button>
              </>)
              : (value === 'Read' && requestStatus === 'Alloted') 
              ? (<>
                  <button type="button" className="btn btn-warning mx-2" onClick={waitRequest}>Waiting</button>
                  <button type="button" className="btn btn-danger mx-2" onClick={cancelRequest}>Cancel</button>
                </>)
              : (<>
                  <button className="btn btn-success mx-2" type="button" onClick={acceptRequest}>Accept</button>
                  <button type="button" className="btn btn-warning mx-2" onClick={waitRequest}>Waiting</button>
                </>)
            }
          </div>

        </ul>) 
      : null}
    </div>
  )
}

MessageCard.propTypes = {
  value: PropTypes.string.isRequired,
  svvID: PropTypes.string.isRequired,
  facilityID: PropTypes.string.isRequired,
  requestID: PropTypes.string.isRequired,
  requestStatus: PropTypes.string.isRequired,
  requestDate: PropTypes.string.isRequired,
  requestTiming: PropTypes.string.isRequired,
  facilityName: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventUnder: PropTypes.string.isRequired,
  eventIncharge: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired
}

export default MessageCard
