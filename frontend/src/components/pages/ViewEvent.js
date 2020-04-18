import React, { Fragment } from 'react'

import { Row, Col } from 'react-bootstrap'
import '../../css/addEvent.css'

const ViewEvent = () => {

  return (
    <Fragment>
      <h1>Ongoing Events</h1>
      <div>
        <Row className="no-gutters mt-5">
          <Col lg={3} className="d-flex flex-column">
            <label>Facility</label>
            <select className="filters facility">
              <option defaultValue>Choose a Facility</option>
              <option value="1">Labs</option>
              <option value="2">Auditorium</option>
              <option value="3">Seminar Hall</option>
              <option value="4">E D Hall</option>
            </select>
          </Col>
          <Col lg={2} className="d-flex flex-column">
            <label>Room No</label>
            <select className="filters labs">
              <option defaultValue value="">Choose a Facility First</option>
              <option value="301">301</option>
              <option value="303">303</option>
              <option value="305">305</option>
              <option value="501">501</option>
              <option value="502">502</option>
              <option value="503">503</option>
              <option value="505">505</option>
            </select>
          </Col>
          <Col lg={3} className="d-flex flex-column">
            <label>Committee</label>
            <select className="filters committee">
              <option defaultValue>Choose a Committee</option>
              <option value="">None</option>
              <option value="1">Student Council</option>
              <option value="2">IEEE</option>
              <option value="3">CSI</option>
              <option value="4">IEI</option>
              <option value="5">IETE</option>
              <option value="6">ACM</option>
            </select>
          </Col>
          <Col lg={2} className="d-flex flex-column">
            <label>Date</label>
            <select className="filters date">
              <option defaultValue>Choose a Date Range</option>
              <option value="1">April 1 - April 7</option>
              <option value="2">April 8 - April 14</option>
              <option value="3">April 15 - April 21</option>
              <option value="4">April 22 - April 28</option>
              <option value="5">April 29 - May 5</option>
            </select>
          </Col>
          <Col lg={2} className="d-flex flex-column">
            <label>Filter</label>
            <div className="btn btn-expand-lg filters" style={{ backgroundColor: '#ff82a3', color: '#ffffff', type: "submit"}}>
              <span style={{paddingRight: '10px'}}>Search</span><i className="fas fa-search"></i>
            </div>
          </Col>
        </Row>  
      </div>
    </Fragment>
  )
}

export default ViewEvent