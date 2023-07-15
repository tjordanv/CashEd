import { useState } from "react"

import TextField from "@mui/material/TextField"

import classes from "./Auth.module.css"

const SecurityQuestionAnswer = ({ answer, setAnswerHandler, error }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <TextField
      required
      value={answer}
      onChange={(e) => setAnswerHandler(e.target.value)}
      className={classes.inputField}
      multiline
      rows={2}
      error={error.isError}
      helperText={error.message}
    />
  )
}

export default SecurityQuestionAnswer
