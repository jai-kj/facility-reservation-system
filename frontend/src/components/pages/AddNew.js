import React, { useState } from 'react'

import Alerts from '../layout/Alerts'

import AddEvent from '../children/AddEvent'
import AddRequest from '../children/AddRequest'
import "../../css/addNew.css"

const AddNew = () => {

  const [visibility, setVisible] = useState({
    isVisibleOne: false,
    isVisibleTwo: false
  })

  const {isVisibleOne, isVisibleTwo} = visibility

  const ShowComponent = () => {
    if(isVisibleOne)
      return <AddEvent />   
    if(isVisibleTwo)
      return <AddRequest />
  }

  return (
    <div>
      <h1>Add New</h1>
      <div className="d-flex justify-content-center mt-5">
        <div className={`card create-option ${isVisibleOne}`} onClick={() => setVisible({isVisibleOne: !isVisibleOne, isVisibleTwo: false})}>
          <h5 className="card-title">Create New Event</h5>
        </div>
        <div className={`card create-option ${isVisibleTwo}`} onClick={() => setVisible({isVisibleTwo: !isVisibleTwo, isVisibleOne: false})}>
          <h5 className="card-title">Create New Request</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
      </div>
      <div style={{marginTop: '2.5rem'}}>
        <Alerts />
        {ShowComponent()}
      </div>
    </div>
  )
}

export default AddNew
