import { useEffect, useState } from "react"

import FetchError from "../utils/fetchError"
import classes from "./InputFields.module.css"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const SecurityQuestions = ({ question, userId, setQuestionHandler }) => {
  const [securityQuestions, setSecurityQuestions] = useState()

  useEffect(() => {
    const getSecurityQuestions = async () => {
      if (userId) {
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
        setSecurityQuestions(updatedQuestions)
      } else {
        let response = await fetch(
          "http://localhost:8080/auth/getSecurityQuestions"
        )

        if (!response.ok) {
          throw FetchError.fromResponse(response)
        } else {
          const responseJson = await response.json()
          setSecurityQuestions(responseJson)
        }
      }
    }
    getSecurityQuestions()
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel id="questionsLabel">Question</InputLabel>
      <Select
        className={classes.inputField}
        labelId="questionsLabel"
        id={classes.questions}
        value={question}
        label="Question"
        onChange={(e) => setQuestionHandler(e.target.value)}
        multiline
        required
      >
        {securityQuestions &&
          securityQuestions.map((securityQuestion) => (
            <MenuItem
              id={classes.questions}
              key={securityQuestion.id}
              value={securityQuestion}
              divider="true"
            >
              {securityQuestion.question}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default SecurityQuestions
