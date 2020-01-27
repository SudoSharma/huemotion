import React, { Component } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import Message from "../components/message.js"
import DetailsModal from "../components/detailsModal.js"
import "typeface-montserrat"
import "typeface-pacifico"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Container, Col, Row, Button, Fade } from "react-bootstrap"

class HuemotionApp extends Component {
  constructor(props) {
    super(props)
    this.state = { isInferencing: false, emotion: "neutral" }
  }

  handleStartClick = () => this.setState({ isInferencing: true })

  handleStopClick = () => {
    this.setState({ isInferencing: false })
    this.handleEmotionChange("neutral")
  }

  handleEmotionChange = newEmotion => this.setState({ emotion: newEmotion })

  render() {
    const isInferencing = this.state.isInferencing
    const emotion = this.state.emotion
    const show = this.state.show
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
        <Navbar bg="transparent" fixed="top" className="justify-content-center">
          <Navbar.Text className="title">Huemotion</Navbar.Text>
        </Navbar>
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
        <Navbar bg="transparent" fixed="bottom">
          <Container className="justify-content-center">
            <DetailsModal />
          </Container>
        </Navbar>
      </Container>
    )
  }
}

const StartButton = props => {
  return <Button className="record" onClick={props.onClick}></Button>
}

const StopButton = props => {
  return <Button className="stop-record" onClick={props.onClick}></Button>
}

const RestartButton = props => {
  return (
    <Button variant="warning" className="refresh" onClick={props.onClick}>
      <IoMdArrowRoundBack />
    </Button>
  )
}

export default HuemotionApp
