import React, { Component } from "react"
import messageStyles from "./message.module.css"

class EmotionMessage extends Component {
  constructor(props) {
    super(props)
    // this.handleSucces = this.handleSuccess.bind(this)
    // this.handleEmotions = this.handleEmotions.bind(this)
    this.video = React.createRef()
    this.canvas = React.createRef()
  }

  getEmotions = async (url, imgData) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: imgData,
    })
    console.log(await response.json())
    return await response.json()
  }

  componentDidMount = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        const API = "http://127.0.0.1:5000"
        const video = this.video.current
        const canvas = this.canvas.current
        const context = canvas.getContext("2d")
        video.srcObject = stream

        setInterval(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          let frame = context.getImageData(0, 0, canvas.width, canvas.height)
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
          }

          context.putImageData(frame, 0, 0)
          canvas.toBlob(blob => {
            let imgData = new FormData()
            imgData.append("imgData", blob)
            this.getEmotions(API, imgData)
          })
        }, 1000)
      })
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
  const emotion = props.emotion
  if (isInferencing) {
    return <EmotionMessage emotion={emotion} />
  } else {
    return <GreetingMessage />
  }
}

export default Message
