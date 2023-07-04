import { useState } from "react"

import { NavLink } from "react-router-dom"

import SecurityQuestions from "./SecurityQuestions"
import SecurityAnswer from "./SecurityAnswer"
import FetchError from "../HelperComponents/FetchError"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

import classes from "./Auth.module.css"
import InputError from "../HelperComponents/InputError"
import fetcher from "../HelperFunctions/fetchAuthorize"

const SecurityQandA = ({ userId, setIsAuthenticatedHandler, type }) => {
  const [answerId, setAnswerId] = useState("")
  const [questionId, setQuestionId] = useState("")
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState({ isError: false, message: "" })
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   answerId
  // }[])

  const setIdsHandler = (question) => {
    setAnswerId(question.answer_id)

    if (type === "register") {
      setQuestionId(question.id)
    }
  }
  const setAnswerHandler = (answer) => {
    setAnswer(answer)
  }

  const validateAnswer = async (e) => {
    e.preventDefault()

    // start the loading state
    setIsLoading(true)
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
          // If answer was correct but email failed to send, throw fetch error
          if (!emailResponse.ok) {
            throw await FetchError.fromResponse(emailResponse)
          } else {
            const emailResponseJson = await emailResponse.json()
            if (emailResponseJson === true) {
              setIsAuthenticatedHandler()
            }
          }
        } else {
          // If answer is incorrect throw InputError
          throw new InputError(
            "Answer is incorrect, please try again.",
            "answer"
          )
        }
      }
    } catch (error) {
      if (error instanceof InputError) {
        setError({
          isError: true,
          message: error.getMessage()
        })
      } else if (error instanceof FetchError) {
        console.log("server error")
      } else {
        console.log("failed to validate")
      }
      setIsLoading(false)
    }
  }

  const saveAnswer = async (e) => {
    e.preventDefault()
    const response = await fetcher(
      "http://localhost:8080/saveSecurityQuestionAnswer",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answer: answer,
          question_id: questionId
        })
      }
    )
  }

  const test = (e) => {
    e.preventDefault()
    console.log(answerId, questionId)
  }

  return (
    <form
      className={classes.form}
      onSubmit={
        type === "validation"
          ? validateAnswer
          : type === "register"
          ? saveAnswer
          : test
      }
    >
      <Box className={classes.container}>
        <SecurityQuestions userId={userId} setIdsHandler={setIdsHandler} />
        <SecurityAnswer
          answer={answer}
          setAnswerHandler={setAnswerHandler}
          error={error}
          //userId={userId}
          // setIsAuthenticatedHandler={setIsAuthenticatedHandler}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          disabled={isLoading}
        >
          Submit
        </Button>
        <NavLink to="/auth/login" className={classes.navLink}>
          Cancel
        </NavLink>
        {/* {message && <ErrorMessage message={message} />} */}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ width: "40px", height: "40px" }}></div>
        )}
      </Box>
    </form>
  )
}

export default SecurityQandA
