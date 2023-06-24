import { useEffect, useState } from "react"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"

const SecurityQuestions = ({ userId, setAnswerIdHandler }) => {
  const [questions, setQuestions] = useState([])
  const [id, setId] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    const getQuestions = async (e) => {
      try {
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
        setAnswerIdHandler(updatedQuestions[0].answer_id)
        setQuestions(updatedQuestions)
      } catch (error) {
        console.log(error.message)
      }
    }
    getQuestions()
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      setAnswerIdHandler(currentQuestionIndex)
    }
  }, [currentQuestionIndex])

  const setCurrentQuestionIndexHandler = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setCurrentQuestionIndex(0)
    } else {
      setCurrentQuestionIndex((prevCount) => prevCount + 1)
    }
  }

  return (
    <>
      {questions.length > 0 && (
        <Typography variant="body2">
          {questions[currentQuestionIndex].question}
        </Typography>
      )}
      <Button onClick={setCurrentQuestionIndexHandler}>next question</Button>
    </>
  )
}

export default SecurityQuestions
