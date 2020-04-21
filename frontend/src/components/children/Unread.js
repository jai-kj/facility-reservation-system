import React, { useContext, useEffect } from 'react'

import RequestContext from '../../context/requests/requestContext'
import AuthContext from '../../context/auth/authContext'

import MessageCard from '../childcomponents/MessageCard'
import ConditionalLoading from '../layout/ConditionalLoading'

const Unread = () => {

  const authContext = useContext(AuthContext)
  const { user } = authContext
  
  const requestContext = useContext(RequestContext)
  const { unreadRequests, getAllUnreadReq } = requestContext

  useEffect(() => {
    getAllUnreadReq(user.svvID)
  }, [user, getAllUnreadReq])
  
  return (
    <div className="messages-block">
      <ConditionalLoading isLoading={!unreadRequests} >
        {(unreadRequests === null || unreadRequests.length === 0)
          ? (<p className="empty text-secondary">No Messages Found</p>)
          : 
            unreadRequests && unreadRequests.map(req => (
              req.requests.map(request =>
                (<MessageCard
                  key={request.requestID}
                  value='Unread'
                  svvID={user.svvID}
                  facilityID={req.facilityID} 
                  requestID={request.requestID}
                  requestStatus={request.requestStatus}
                  requestDate={request.requestSlotDate}
                  requestTiming={`${request.requestSlotFrom.replace(':00', '')} - ${request.requestSlotTill.replace(':00', '')}`}
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
export default Unread
