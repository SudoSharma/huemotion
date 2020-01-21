import React, { Component } from "react"
import messageStyles from "./message.module.css"

class EmotionMessage extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.canvas = React.createRef()
    this.intervalID = 0
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

    video.srcObject = null
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
        method: "PUT",
        // mode: "no-cors",
        body: imgData,
      })
      console.log("Response: " + (await response.json()))
      const result = await response.json()
      this.handleChange(result.body)
    } catch (err) {
      this.handleChange("oops")
      this.cleanUpVideo()
      alert(err)
    }
  }

  async componentDidMount() {
    // const API = "https://mmdu9l6ff1.execute-api.us-west-1.amazonaws.com/Prod/"
    const API =
      "https://2o6hpkpf64.execute-api.us-west-1.amazonaws.com/default/getEmotions"
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
          this.getEmotions(API, blob)
        })
      }, 1000)
    } catch (err) {
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
    const emotion = this.props.emotion

    return (
      <div>
        <video
          ref={this.video}
          autoPlay
          className={messageStyles.video}
        ></video>
        <canvas ref={this.canvas} className={messageStyles.canvas}></canvas>
        <h1 className={messageStyles.message}>{emotion}</h1>
      </div>
    )
  }
}

function GreetingMessage(props) {
  return <h1 className={messageStyles.message}>How are you feeling today?</h1>
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

export default Message
