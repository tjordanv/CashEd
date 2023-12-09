import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import SecurityQuestions from "../../uiComponents/SecurityQuestions"
import SecurityAnswer from "../../uiComponents/SecurityAnswer"
import FetchError from "../../utils/fetchError"

import CircularProgress from "@mui/material/CircularProgress"

import classes from "./Auth.module.css"
import InputError from "../../utils/inputError"
import fetcher from "../../utils/fetchAuthorize"
import SecurityQuestionsCounter from "./SecurityQuestionsCounter"
import FormButton from "../../uiComponents/FormButton"

/**
 * The container for users to create and answer security questions upon registration or user credential recovery.
 * @param {string} type the type of securityQandA to render. This is used to determine which functionality to use within
 * the component. Options include [forgot password, forgot username, and register]
 * @param {object} user the user object. This is used to fetch the appropriate data when a user needs MFA or credential recovery.
 * @param {function} setIsAuthenticatedHandler used to set a boolean value in the parent component that signifies that the user has been
 * successfully authenticated, triggering a page render change.
 */
const SecurityQandA = ({ type, user, setIsAuthenticatedHandler }) => {
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const [questionCount, setQuestionCount] = useState(1)
  const [error, setError] = useState({ isError: false, message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const userId = user ? user.id : null

  const navigate = useNavigate()

  useEffect(() => {
    if (questionCount > 3) navigate("/")
  }, [questionCount])

  // used to authenticate users for MFA or credential recovery
  const validateAnswer = async (e) => {
    e.preventDefault()

    // start the loading state and check if answer is correct
    setIsLoading(true)
    try {
      const answerResponse = await fetch(
        `http://localhost:8080/auth/validateAnswer?${new URLSearchParams({
          answerProvided: answer,
          id: question.answer_id
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
        // send recovery email to the user if answer is correct
        if (answerResponseJson === true) {
          let emailResponse
          if (type === "forgot password") {
            emailResponse = await fetch(
              `http://localhost:8080/auth/resetPassword?${new URLSearchParams({
                username: user.username,
                email: user.email
              })}`,
              {
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
          } else if (type === "forgot username") {
            emailResponse = await fetch(
              `http://localhost:8080/auth/usernameRecovery?${new URLSearchParams(
                {
                  id: user.id
                }
              )}`,
              {
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
          }
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
        console.log(error.message)
      }
      setIsLoading(false)
    }
  }

  // Used to save a new security question answer
  const saveAnswer = async (e) => {
    e.preventDefault()

    try {
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
            question_id: question.id
          })
        }
      )
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      }
      // if the user successfully saved their third question navigate them to the dashboard, otherwise add to the count and reset the Q&A
      else if (response.status === 201) {
        if (questionCount === 3) {
          navigate("/")
        } else {
          setQuestionCount((prevCount) => prevCount + 1)
          setAnswer("")
          setQuestion("")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const test = (e) => {
    e.preventDefault()
    console.log("test function on submit")
  }

  return (
    <form
      className={classes.container}
      onSubmit={
        ["forgot password", "forgot username"].includes(type)
          ? validateAnswer
          : type === "register"
          ? saveAnswer
          : test
      }
    >
      {type === "register" && (
        <SecurityQuestionsCounter count={questionCount} />
      )}
      <SecurityQuestions
        userId={userId}
        setQuestionHandler={setQuestion}
        question={question}
      />
      <SecurityAnswer
        answer={answer}
        setAnswerHandler={setAnswer}
        error={error}
      />
      <FormButton type="submit" disabled={isLoading} />
      {isLoading && <CircularProgress className={classes.loader} />}
    </form>
  )
}
export default SecurityQandA
