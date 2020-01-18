import React from "react"
import greetingStyles from "./greeting.module.css"

export default props => (
  <h1 className={greetingStyles.greeting}>{props.text}</h1>
)
