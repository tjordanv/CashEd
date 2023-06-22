import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../components/Authentication/LoginAndRegisterForms.module.css"
import FetchError from "../components/HelperComponents/FetchError"
import ErrorMessage from "../components/Authentication/ErrorMessage"

const SecurityQuestionAndAnswer = () => {
  const [questions, setQuestions] = useState([])
  const [id, setId] = useState("")
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (questions.length > 0) {
      setId(questions[currentQuestionIndex].answer_id)
    }
  }, [currentQuestionIndex])

  const setCurrentQuestionIndexHandler = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setCurrentQuestionIndex(0)
    } else {
      setCurrentQuestionIndex((prevCount) => prevCount + 1)
    }
  }

  const validateAnswer = async (e) => {
    console.log("in")
    e.preventDefault()
    try {
      console.log("start")
      const response = await fetch(
        `http://localhost:8080/auth/validateAnswer?${new URLSearchParams({
          answerProvided: answer,
          id: id
        })}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      console.log("end")
      if (!response.ok) {
        console.log("errorrrr")
        throw await FetchError.fromResponse(response)
      }
      if (response.status === 200) {
        const responseJson = await response.json()
        console.log(responseJson)
      } else {
        console.log("reseJson")
        throw await FetchError.fromResponse(response)
      }
    } catch (error) {
      console.log("huuuh")
      if (error instanceof FetchError) setMessage(error.message)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={validateAnswer}>
        <Box className={classes.container}>
          {questions.length > 0 && (
            <Typography variant="body2">
              {questions[currentQuestionIndex].question}
            </Typography>
          )}
          <TextField
            // required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={classes.inputField}
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Next
          </Button>
          <Button onClick={setCurrentQuestionIndexHandler}>test</Button>
          <ErrorMessage message={message} />
        </Box>
      </form>
    </div>
  )
}

export default SecurityQuestionAndAnswer
