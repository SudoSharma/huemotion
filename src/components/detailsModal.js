import React, { Component } from "react"
import detailsModalStyles from "./detailsModal.module.css"
import { Navbar, Button, Modal } from "react-bootstrap"

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
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default DetailsModal
