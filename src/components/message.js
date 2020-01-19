import React from "react"
import messageStyles from "./message.module.css"

function GreetingMessage(props) {
  return <h1 className={messageStyles.message}>How are you feeling today?</h1>
}

function EmotionMessage(props) {
  return <h1 className={messageStyles.message}>Neutral</h1>
}

function Message(props) {
  const isInferencing = props.isInferencing
  if (isInferencing) {
    return <EmotionMessage />
  } else {
    return <GreetingMessage />
  }
}

export default Message
