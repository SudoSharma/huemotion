import React from "react"
import Greeting from "../components/greeting.js"
import "typeface-montserrat"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from "react-bootstrap"

export default () => (
  <Container>
    <Row>
      <Col className="greeting-col">
        <Greeting text="How are you feeling today?" />
      </Col>
    </Row>
  </Container>
)
