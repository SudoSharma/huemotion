import React, { Component } from "react"
import { Button } from "react-bootstrap"

class StartButton extends Component {
  componentWillUnmount() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(this.handleSuccess)
      .catch(this.videoError)
  }

  //   handleSuccess = function(stream) {
  //     const options = { mimeType: "video/webm" }
  //     const recordedChunks = []
  //     const mediaRecorder = new MediaRecorder(stream, options)

  //     mediaRecorder.addEventListener("dataavailable", function(e) {
  //       if (e.data.size > 0) {
  //         recordedChunks.push(e.data)
  //       }

  //       if (shouldStop === true && stopped === false) {
  //         mediaRecorder.stop()
  //         stopped = true
  //       }
  //     })

  // mediaRecorder.addEventListener("stop", function() {
  //   downloadLink.href = URL.createObjectURL(new Blob(recordedChunks))
  //   downloadLink.download = "acetest.webm"
  // })

  // mediaRecorder.start()
  //   }

  render() {
    return (
      <Button variant="light" onClick={this.props.onClick}>
        Start
      </Button>
    )
  }
}

export default StartButton
