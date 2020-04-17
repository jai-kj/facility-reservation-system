import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

import { Row, Col } from 'react-bootstrap'
const ViewEvent = () => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    authContext.loadUser()
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      <h1 className="pt-3">Ongoing Events</h1>
      <Row className="no-gutters">
        <Col lg={2}>
          hi
        </Col>
        <Col lg={2}>
          hi
        </Col>
        <Col lg={3}>
          hi
        </Col>
        <Col lg={3}>
          hi
        </Col>
        <Col lg={2}>
          hi
        </Col>
      </Row>
    </div>
  )
}

export default ViewEvent