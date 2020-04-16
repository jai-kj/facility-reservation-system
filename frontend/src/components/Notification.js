import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const Notification = () => {
  const right = {
      top: '0',
      right: '0',
      position: 'absolute',
      width: '20rem',
      height: '6rem',
      borderRadius: '10px 0 0 10px',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '22px',
      padding: '15px 0px',
      border: '1px solid #f7f7f7',
      boxShadow: '0 4px 8px 0 rgba(172, 172, 172, 0.2)'
    }
  return (
    <Card className="d-flex flex-row" style={right}>
      <Row>
        <Col sm={2}>
          <i className="far fa-bell notify"></i>
        </Col>
        <Col sm={10}>
          <span><strong>2 unread messages</strong></span>
          <h6><a data-toggle="modal" href="#myModal" className="notify-link">Read now ></a></h6>
        </Col> 
      </Row>
    </Card>
  )
}

export default Notification
