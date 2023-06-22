import { useState } from "react"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../components/Authentication/LoginAndRegisterForms.module.css"
import FetchError from "../components/HelperComponents/FetchError"
import ErrorMessage from "../components/Authentication/ErrorMessage"

const EmailLookup = () => {
  const [questions, setQuestions] = useState([])
  const [id, setId] = useState("")
  const [emailAddress, setEmailAddress] = useState("")

  const [message, setMessage] = useState("")

  const getUserInfoByEmail = async (e) => {
    e.preventDefault()

    try {
      const userResponse = await fetch(
        `http://localhost:8080/auth/getUserIdByEmail?${new URLSearchParams({
          emailAddress: emailAddress
        })}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!userResponse.ok) throw await FetchError.fromResponse(userResponse)

      const userId = await userResponse.json()

      const questionAnswersResponse = await fetch(
        `http://localhost:8080/auth/getActiveSecurityQuestionAnswersByUserId?${new URLSearchParams(
          { id: userId }
        )}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!questionAnswersResponse.ok)
        throw await FetchError.fromResponse(questionAnswersResponse)

      const questionAnswers = await questionAnswersResponse.json()

      let params = new URLSearchParams()
      questionAnswers.forEach((question) =>
        params.append("ids", question.question_id)
      )

      const questionsResponse = await fetch(
        `http://localhost:8080/auth/getSecurityQuestions?${params.toString()}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!questionsResponse.ok)
        throw await FetchError.fromResponse(questionsResponse)

      // remaining question info to add, the question itself
      const questionsInfo = await questionsResponse.json()
      // create a new array so we aren't mutating the questions state directly
      const updatedQuestions = questionAnswers.map((question) => {
        // merge the questions if found
        const newQuestion = questionsInfo.find(
          ({ id }) => id === question.question_id
        )

        if (newQuestion) {
          return { ...question, ...newQuestion }
        }

        return question
      })
      setId(updatedQuestions[0].answer_id)
      setQuestions(updatedQuestions)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={getUserInfoByEmail}>
        <Box className={classes.container}>
          <Typography variant="h4" className={classes.header}>
            Finance App
          </Typography>
          <TextField
            variant="outlined"
            label="Email Address"
            type="email"
            name="emailAddress"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className={classes.inputField}
            size="small"
          />
          <ErrorMessage message={message} />
          <Button type="submit" variant="contained" className={classes.button}>
            Next
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default EmailLookup
