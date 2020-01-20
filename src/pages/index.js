import React, { Component } from "react"
import Message from "../components/message.js"
import "typeface-montserrat"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Col, Row, Button } from "react-bootstrap"

class HuemotionApp extends Component {
  constructor(props) {
    super(props)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
    this.state = { isInferencing: false, emotion: "neutral" }
  }

  handleStartClick() {
    this.setState({ isInferencing: true })
  }

  handleStopClick() {
    this.setState({ isInferencing: false })
  }

  render() {
    const isInferencing = this.state.isInferencing
    const emotion = this.state.emotion
    let button

    if (isInferencing) {
      button = <StopButton onClick={this.handleStopClick} />
    } else {
      button = <StartButton onClick={this.handleStartClick} />
    }

    return (
      <Container
        fluid="true"
        className={`h-100 ${isInferencing ? emotion : "gradient-bkg"}`}
      >
        <Row className="h-100">
          <Col className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Message isInferencing={isInferencing} emotion={emotion} />
            {button}
          </Col>
        </Row>
      </Container>
    )
  }
}

function StartButton(props) {
  return (
    <Button variant="light" onClick={props.onClick}>
      Start
    </Button>
  )
}

function StopButton(props) {
  return (
    <Button variant="light" onClick={props.onClick}>
      Stop
    </Button>
  )
}

export default HuemotionApp
