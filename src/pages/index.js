import React, { Component } from "react"
import Message from "../components/message.js"
import "typeface-montserrat"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Col, Row, Button } from "react-bootstrap"

class HuemotionApp extends Component {
  constructor(props) {
    super(props)
    this.state = { isInferencing: false, emotion: "neutral" }
  }

  handleStartClick = () => {
    this.setState({ isInferencing: true })
  }

  handleStopClick = () => {
    this.setState({ isInferencing: false })
    this.handleEmotionChange("neutral")
  }

  handleEmotionChange = newEmotion => {
    this.setState({ emotion: newEmotion })
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

    if (emotion === "oops") {
      button = <RestartButton onClick={this.handleStopClick} />
    }

    return (
      <Container
        fluid="true"
        className={`h-100 ${isInferencing ? emotion : "gradient-bkg"}`}
      >
        <Row className="h-100">
          <Col className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Message
              isInferencing={isInferencing}
              emotion={emotion}
              onEmotionChange={this.handleEmotionChange}
            />
            {button}
          </Col>
        </Row>
      </Container>
    )
  }
}

const StartButton = props => {
  return (
    <Button variant="light" onClick={props.onClick}>
      Start
    </Button>
  )
}

const StopButton = props => {
  return (
    <Button variant="light" onClick={props.onClick}>
      Stop
    </Button>
  )
}

const RestartButton = props => {
  return (
    <Button variant="dark" onClick={props.onClick}>
      Try Again
    </Button>
  )
}

export default HuemotionApp
