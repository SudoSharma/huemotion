import React, { Component } from "react"
import detailsModalStyles from "./detailsModal.module.css"
import { Navbar, Button, Modal, Container, Row, Col } from "react-bootstrap"

class DetailsModal extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  handleShow = () => this.setState({ show: true })
  handleClose = () => this.setState({ show: false })

  render() {
    const show = this.state.show
    const handleShow = this.handleShow
    const handleClose = this.handleClose
    return (
      <>
        <Navbar.Text className="details">
          <Button
            variant="link"
            className={detailsModalStyles.details}
            onClick={handleShow}
          >
            What is this?
          </Button>
        </Navbar.Text>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            className={detailsModalStyles.detailHeader}
            closeButton
          ></Modal.Header>
          <Modal.Body className={detailsModalStyles.detailBody}>
            <Container>
              <Row className="flex-column">
                <Col>
                  <h4>
                    <b>What is this?</b>
                  </h4>
                </Col>
                <Col className={detailsModalStyles.detailContent}>
                  <p>
                    <span className="title-inline">Huemotion</span> is a web app
                    that predicts your emotions in real-time using computer
                    vision.
                  </p>
                  <p>
                    Images are captured from your web cam* and sent to a deep
                    learning model in the cloud, which analyzes your facial
                    expressions to predict your emotional state.
                  </p>
                  <p>
                    The current model is <strike>really dumb</strike> somewhat
                    naive and will be updated periodically.
                  </p>
                  <small className="text-muted">
                    <em>
                      <b>*Please note:</b> You will need to give access to your
                      web cam in order to use the app. No video data is ever
                      saved or persisted anywhere.
                    </em>
                  </small>
                </Col>
                <Col className={detailsModalStyles.detailFooter}>
                  <small className="text-muted">
                    <a href="https://www.sudosharma.com">&copy; SudoSharma</a>
                  </small>
                  <small className={detailsModalStyles.divider}>|</small>
                  <small className="text-muted">
                    <a href="https://github.com/sudosharma/huemotion_frontend">
                      v1.0
                    </a>
                  </small>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default DetailsModal
