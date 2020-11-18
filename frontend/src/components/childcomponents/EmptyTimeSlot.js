import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import SelectContext from '../../context/select/selectContext'

const EmptyTimeSlot = ({timeID, startTime, endTime}) => {
  
  const selectContext = useContext(SelectContext)
  const { timeSchedule, addTimeSlot, removeTimeSlot }  = selectContext

  const updateSlot = () => {
    if(timeSchedule.length === 0 || !timeSchedule.includes(timeID))
      addTimeSlot(timeID)
    else
      removeTimeSlot(timeID)
  }

  var activeSlot = {}
  if(timeSchedule.includes(timeID))
    activeSlot = {
      backgroundColor: '#7377E8',
      color: '#ffffff'
    }

  return (
    <div
      className="card p-1 time-slots text-center"
      style={Object.assign(activeSlot)} 
      onClick={updateSlot}
    >
      <span>{startTime.replace(':00', '')} - {endTime.replace(':00', '')}</span>
    </div>
  )
}

EmptyTimeSlot.propTypes = {
  timeID: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
}

export default EmptyTimeSlot
