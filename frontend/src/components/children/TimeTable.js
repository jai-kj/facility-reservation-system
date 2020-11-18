import React, { useContext } from 'react'

import FilterContext from '../../context/filters/filterContext'
import ConditionLoading from '../layout/ConditionalLoading'
import ShowEvent from '../childcomponents/ShowEvent'

const TimeTable = () => {

  const filterContext = useContext(FilterContext)
  const { timetable } = filterContext

  return (
    <div className='tt'>
      <ConditionLoading isLoading={!timetable}>
        <table className='event-table'>
          <tbody>
            <tr className='table-header'>
              <th className='days first-cell'>Days</th>
              {
                timetable && timetable.Friday.map(time => 
                  (<th key={time.timeID}>
                    {time.startTime.replace(':00','')} {time.endTime.replace(':00','')}
                  </th>)
                )
              }
            </tr>
            {timetable && Object.entries(timetable).map(
              key => (<tr className='table-rows my-1' key={key[0]}><td className='days'>{key[0]}</td>
                {
                  key[1].map(item => (
                    <td key={item.timeID}>
                      {item.status === 'Vacant' ? (<span></span>) : 
                        item.status === 'Reserved' ?
                        (<span className={`${item.status}`}>{item.status}</span>) :
                        (<ShowEvent 
                          key={item.event}
                          eventID={item.event}
                          status={item.status}
                          startTime={item.startTime.replace(':00', '')}
                          endTime={item.endTime.replace(':00', '')}
                        />)
                      }
                    </td>
                  ))
                }
              </tr>)
            )}
          </tbody>
        </table>
      </ConditionLoading>
    </div>
  )
}

export default TimeTable
