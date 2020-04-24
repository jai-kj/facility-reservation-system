import React, { useContext, useRef, useEffect } from 'react'

import EventContext from '../../context/events/eventContext'

const FilterEvent = () => {

  const eventContext = useContext(EventContext)
  const { filteredEvents, filterEvents, clearFilteredEvents} = eventContext

  const text = useRef('')

  useEffect(() => {
    if(filteredEvents === null)
      text.current.value = ''
    //eslint-disable-next-line   
  }, [])

  const onChange = (e) => {
    if(text.current.value !== '')
      filterEvents(e.target.value)
    else
      clearFilteredEvents()
  }

  return (
    <div>
      <input 
        ref={text} 
        className='filters w-100 mb-3'
        style={{cursor: 'text'}} 
        type="text" 
        placeholder="Search Event..."
        onChange={onChange} 
      />
    </div>
  )
}

export default FilterEvent
