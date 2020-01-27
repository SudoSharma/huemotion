import React, { Component } from "react"
import messageStyles from "./message.module.css"
import { BarLoader } from "react-spinners"

class EmotionMessage extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.canvas = React.createRef()
    this.intervalID = 0
    this.state = { loading: true }
  }

  handleChange = newEmotion => {
    this.props.onEmotionChange(newEmotion)
  }

  cleanUpVideo = () => {
    clearInterval(this.intervalID)

    const video = this.video.current
    let stream = video.srcObject
    let tracks = stream.getTracks()

    tracks.forEach(track => {
      track.stop()
    })
  }

  applyGrayFilter = frame => {
    const l = frame.data.length / 4
    for (var i = 0; i < l; i++) {
      var grey =
        (frame.data[i * 4 + 0] +
          frame.data[i * 4 + 1] +
          frame.data[i * 4 + 2]) /
        3

      frame.data[i * 4 + 0] = grey
      frame.data[i * 4 + 1] = grey
      frame.data[i * 4 + 2] = grey
      return frame
    }
  }

  async getEmotions(url, imgData) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: imgData,
      })
      const result = await response.json()
      this.setState({ loading: false })
      this.handleChange(result)
      console.log("Current Emotion: " + result)
    } catch (err) {
      this.setState({ loading: false })
      this.handleChange("oops")
      console.log(err)
      try {
        this.cleanUpVideo()
      } catch (cleanUpErr) {
        console.log(cleanUpErr)
      }
    }
  }

  async componentDidMount() {
    const API = "https://blo5s52vq5.execute-api.us-west-1.amazonaws.com/prod"
    const video = this.video.current
    const canvas = this.canvas.current
    const context = canvas.getContext("2d")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      video.srcObject = stream

      this.intervalID = setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        let frame = context.getImageData(0, 0, canvas.width, canvas.height)
        frame = this.applyGrayFilter(frame)

        context.putImageData(frame, 0, 0)
        canvas.toBlob(blob => {
          let imgData = new FormData()
          imgData.append("imgData", blob)
          this.getEmotions(API, imgData)
        })
      }, 333) // Roughly 3fps
    } catch (err) {
      this.setState({ loading: false })
      console.log(err)
      alert("Please enable video to use huemotion!")
      this.handleChange("oops")
    }
  }

  componentWillUnmount() {
    try {
      this.cleanUpVideo()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let emotion = this.props.emotion
    let loading = this.state.loading
    let displayMessage

    if (loading) {
      displayMessage = (
        <div className={messageStyles.loader}>
          <BarLoader color="#00fff1" width="200px" />
        </div>
      )
    } else {
      displayMessage = <h1 className={messageStyles.message}>{emotion}</h1>
    }

    return (
      <div>
        <video
          ref={this.video}
          autoPlay
          className={messageStyles.video}
        ></video>
        <canvas ref={this.canvas} className={messageStyles.canvas}></canvas>
        {displayMessage}
      </div>
    )
  }
}

function Message(props) {
  const isInferencing = props.isInferencing
  const onEmotionChange = props.onEmotionChange
  const emotion = props.emotion
  if (isInferencing) {
    return (
      <EmotionMessage emotion={emotion} onEmotionChange={onEmotionChange} />
    )
  } else {
    return <GreetingMessage />
  }
}

function GreetingMessage() {
  return <h1 className={messageStyles.message}>How are you feeling today?</h1>
}

export default Message
