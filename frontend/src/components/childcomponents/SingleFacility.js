import React from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react';

const SingleFacility = props => {
  const { facilityName, facilityType, facilityStartTime, facilityEndTime, requests } = props
  // const [   ]
  // console.log(requests[0])
  const onEdit = () => console.log(`Edit for facilityID`)
  return (
    <div className="card card-body">
      <div className="d-flex flex-row align-items-center">
        <div>
          <h6>{facilityType} {facilityName}</h6>
          <label
            className="text-secondary" 
            style={{fontSize: '14px'}}>
              Operational Time: {facilityStartTime.replace(':00', '')} - {facilityEndTime.replace(':00', '')}
          </label>
        </div>
        <Tippy content="Edit this Facility">
          <button 
            className="btn btn-dark btn-sm"
            style={{width: '5rem', right: '8rem', position: 'absolute'}}
            onClick={onEdit}>
            Edit
          </button>
        </Tippy>
        <Tippy content="Show all alloted Events">
          <button 
            className="btn btn-info btn-sm"
            style={{width: '5rem', right: '2.5rem', position: 'absolute'}}>
            Events
          </button>
        </Tippy>
      </div>
    </div>
  )
}

SingleFacility.propTypes = {
  facilityName: PropTypes.string.isRequired,
  facilityType: PropTypes.string.isRequired,
  facilityStartTime: PropTypes.string.isRequired,
  facilityEndTime: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired
}

export default SingleFacility
