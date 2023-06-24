import { useState } from "react"
import SecurityQuestions from "./SecurityQuestions"
import SecurityAnswer from "./SecurityAnswer"

import Box from "@mui/material/Box"

import classes from "../Auth.module.css"

const SecurityQAndAContainer = ({ userId, setIsAuthenticatedHandler }) => {
  const [answerId, setAnswerId] = useState("")

  const setAnswerIdHandler = (answerId) => {
    setAnswerId(answerId)
  }
  return (
    <Box className={`${classes.container} ${classes.form}`}>
      <SecurityQuestions
        userId={userId}
        setAnswerIdHandler={setAnswerIdHandler}
      />
      <SecurityAnswer
        answerId={answerId}
        userId={userId}
        setIsAuthenticatedHandler={setIsAuthenticatedHandler}
      />
    </Box>
  )
}

export default SecurityQAndAContainer
