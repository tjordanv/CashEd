import { useEffect, useState } from "react"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../../HelperComponents/ErrorMessage"

const SecurityQAndAContainer = ({
  userId,
  answerId,
  setIsAuthenticatedHandler
}) => {
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const validateAnswer = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const answerResponse = await fetch(
        `http://localhost:8080/auth/validateAnswer?${new URLSearchParams({
          answerProvided: answer,
          id: answerId
        })}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!answerResponse.ok) {
        throw await FetchError.fromResponse(answerResponse)
      } else {
        const answerResponseJson = await answerResponse.json()
        if (answerResponseJson === true) {
          const emailResponse = await fetch(
            `http://localhost:8080/auth/usernameRecovery?${new URLSearchParams({
              id: userId
            })}`,
            {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )

          if (!emailResponse.ok) {
            throw await FetchError.fromResponse(emailResponse)
          } else {
            const emailResponseJson = await emailResponse.json()
            if (emailResponseJson === true) {
              setIsAuthenticatedHandler()
            }
          }
        } else {
          throw new Error("Answer is incorrect, please try again.")
        }
      }
    } catch (error) {
      setIsLoading(false)
      setMessage(error.message)
    }
  }

  return (
    <form onSubmit={validateAnswer}>
      <TextField
        // required
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className={classes.inputField}
        multiline
        rows={2}
      />
      <Button type="submit" variant="contained" className={classes.button}>
        Submit
      </Button>
      {message && <ErrorMessage message={message} />}
      {isLoading && <CircularProgress />}
    </form>
  )
}

export default SecurityQAndAContainer
