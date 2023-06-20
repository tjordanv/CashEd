import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../components/Authentication/LoginAndRegisterForms.module.css"
import FetchError from "../components/HelperComponents/FetchError"
import ErrorMessage from "../components/Authentication/ErrorMessage"

const UsernameRecovery = () => {
  const [questions, setQuestions] = useState([])
  const [id, setId] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const navigate = useNavigate()

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

      setQuestions(updatedQuestions)
    } catch (error) {
      console.log(error.message)
    }
  }

  const setCurrentQuestionIndexHandler = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setCurrentQuestionIndex(0)
    } else {
      setCurrentQuestionIndex((prevCount) => prevCount + 1)
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
          <Button onClick={setCurrentQuestionIndexHandler}>test</Button>
          {questions.length > 0 && (
            <Typography variant="body2">
              {questions[currentQuestionIndex].question}
            </Typography>
          )}
        </Box>
      </form>
    </div>
  )
}

export default UsernameRecovery
