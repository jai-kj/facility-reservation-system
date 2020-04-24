import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import FacilityContext from '../../context/facility/facilityContext'

import FilterFacility from '../searchFilters/FilterFacility'
import ConditionalLoading from '../layout/ConditionalLoading'
import SingleFacility from '../childcomponents/SingleFacility'

const Facilities = ({svvID}) => {

  const facilityContext = useContext(FacilityContext)
  const { fetchAllFacilities, allFacilitiesData, filteredFacilitiesData } = facilityContext

  useEffect(() => {
    fetchAllFacilities(svvID)
    //eslint-disable-next-line
  }, [])

  return (
    <div className='facilities-container'>
      <FilterFacility />
      <div className='facilities-block'>
      <ConditionalLoading isLoading={!allFacilitiesData}>
      {( allFacilitiesData === null || allFacilitiesData.length === 0) ? 
        (<p className="empty text-secondary">
          You have no Facilities Under You.
          <br />Please create a Facility
        </p>)
        : filteredFacilitiesData !== null ? filteredFacilitiesData.length === 0 ? 
          (<p className="empty text-secondary">Found No Facilities</p>)
          :(<TransitionGroup>
            { filteredFacilitiesData.map( facility =>(
              <CSSTransition
                key={facility.facilityName}
                timeout={500}
                classNames="item"
                >
                <SingleFacility 
                  facilityName={facility.facilityName}
                  facilityType={facility.facilityType}
                  facilityStartTime={facility.facilityStartTime}
                  facilityEndTime={facility.facilityEndTime}
                  requests={facility.requests}
                />
              </CSSTransition>
              ))
            }
          </TransitionGroup>)
          : (<TransitionGroup>
            { allFacilitiesData && allFacilitiesData.map( facility => (
              <CSSTransition
                key={facility.facilityName}
                timeout={500}
                classNames="item"
                >
                <SingleFacility 
                  facilityName={facility.facilityName}
                  facilityType={facility.facilityType}
                  facilityStartTime={facility.facilityStartTime}
                  facilityEndTime={facility.facilityEndTime}
                  requests={facility.requests}
                />
              </CSSTransition>
              ))
            }
          </TransitionGroup>)
        } 
      </ConditionalLoading>
      </div>
    </div>
  )
}

Facilities.propTypes = { svvID: PropTypes.string.isRequired }

export default Facilities
