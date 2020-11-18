import React, { useContext} from 'react'
import { Row, Col } from  'react-bootstrap'
import '../../css/facility.css'

import AuthContext from '../../context/auth/authContext'

import FacilityForm from '../children/FacilityForm'
import Facilities from '../children/Facilities'

const Facility = () => {
  
  const authContext = useContext(AuthContext)
  const { user } = authContext
  return (
    <div>
      <h1>Facility Management</h1>
      <Row style={{margin: '5rem 1rem 0'}}>
        <Col md={4}>
          <FacilityForm />
        </Col>
        <Col md={8}>
          <Facilities svvID={user && user.svvID} />
        </Col>
      </Row>
    </div>
  )
}

export default Facility
