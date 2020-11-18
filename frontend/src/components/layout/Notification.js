import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Modal, Button } from 'react-bootstrap'

import FilterContext from '../../context/filters/filterContext'

import Unread from '../children/Unread'
import Read from '../children/Read'

import '../../css/notification.css'
  
const Notification = ({count}) => {
  
  const filterContext = useContext(FilterContext)
  const { clearTimeTableData } = filterContext
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    clearTimeTableData()
  };
  const handleShow = () => setShow(true);

  const [visibility, setVisible] = useState({
    isVisibleOne: true,
    isVisibleTwo: false
  })

  const {isVisibleOne, isVisibleTwo} = visibility

  const ShowComponent = () => {
    if(isVisibleOne)
      return <Unread />   
    if(isVisibleTwo)
      return <Read />
  }

  return (
    <Card className="right">
      <Row>
        <Col sm={2}>
          <i className="far fa-bell notify"></i>
        </Col>
        <Col sm={10}>
          <span><strong>{(count !== 0) ? count: 'No'} unread messages</strong></span>
          <h6>
            <a 
              href="#!" 
              style={{cursor: 'pointer', color: '#428bca'}}
              onClick={handleShow}
            >
              {'Read now >'}
            </a>

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><h2>Notifications</h2></Modal.Title>
              </Modal.Header>
              <Modal.Body style={{height: '70vh'}}>
                <nav>
                  <div className="nav nav-tabs nav-justified nav-pills">
                    <a 
                      className={`nav-item nav-link ${isVisibleOne}`}
                      href="#!" 
                      onClick={() => setVisible({isVisibleOne: true, isVisibleTwo: false})}
                    >Unread</a>
                    <a 
                      className={`nav-item nav-link ${isVisibleTwo}`}
                      id="nav-read-tab" 
                      href="#!"
                      onClick={() => setVisible({isVisibleTwo: true, isVisibleOne: false})}
                    >Read</a>
                  </div>

                </nav>

                <div>
                  {ShowComponent()}
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

          </h6>
        </Col> 
      </Row>
    </Card>
  )
}

Notification.protoTypes = {
  count: PropTypes.number.isRequired
}

export default Notification
