import React, { useContext, useEffect } from 'react'

import RequestContext from '../../context/requests/requestContext'
import AuthContext from '../../context/auth/authContext'

import MessageCard from '../childcomponents/MessageCard'
import ConditionalLoading from '../layout/ConditionalLoading'

const Read = () => {

  const authContext = useContext(AuthContext)
  const { user } = authContext
  
  const requestContext = useContext(RequestContext)
  const { readRequests, getAllReadReq } = requestContext

  useEffect(() => {
    getAllReadReq(user.svvID)
  }, [user, getAllReadReq])

  return (
    <div className="messages-block">
       <ConditionalLoading isLoading={!readRequests} >
        {(readRequests === null || readRequests.length === 0)
          ? (<p className="empty text-secondary">No Messages Found</p>)
          : 
            readRequests && readRequests.map(req => (
              req.requests.map(request =>
                (<MessageCard
                  key={request.requestID}
                  value='Read'
                  svvID={user.svvID}
                  facilityID={req.facilityID} 
                  requestID={request.requestID}
                  requestStatus={request.requestStatus}
                  requestDate={request.requestSlotDate}
                  requestTiming={`${request.requestSlotFrom} - ${request.requestSlotTill}`}
                  facilityName={`${req.facilityType} ${req.facilityName}`}
                  eventName={request.event.eventName}
                  eventUnder={request.event.eventUnder}
                  eventIncharge={request.event.eventIncharge}
                  eventDescription={request.event.eventDescription}
                />)
              )
            )
          )
        }
      </ConditionalLoading>
    </div>
  )
}

export default Read
