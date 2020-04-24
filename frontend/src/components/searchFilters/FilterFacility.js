import React, { useContext, useRef, useEffect } from 'react'

import FacilityContext from '../../context/facility/facilityContext'

const FilterFacility = () => {

  const facilityContext = useContext(FacilityContext)
  const { filteredFacilitiesData, filterFacilities, clearFilteredFacilities} = facilityContext

  const text = useRef('')

  useEffect(() => {
    if(filteredFacilitiesData === null)
      text.current.value = ''
    //eslint-disable-next-line   
  }, [])

  const onChange = (e) => {
    if(text.current.value !== '')
      filterFacilities(e.target.value)
    else
      clearFilteredFacilities()
  }

  return (
    <div>
      <input 
        ref={text} 
        className='filters w-100 mb-3'
        style={{cursor: 'text'}} 
        type="text" 
        placeholder="Search Facility..."
        onChange={onChange} 
      />
    </div>
  )
}

export default FilterFacility
