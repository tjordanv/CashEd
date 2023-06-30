import Button from "@mui/material/Button"

import FetchError from "../../HelperComponents/FetchError"
import { useEffect, useState } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import classes from "../Auth.module.css"
import { TextField } from "@mui/material"
import SecurityQuestionAnswer from "../userRecovery/SecurityAnswer"

const RegisterSecurityQuestions = () => {
  const [securityQuestions, setSecurityQuestions] = useState()
  const [question, setQuestion] = useState("")

  useEffect(() => {
    const getSecurityQuestions = async () => {
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
    getSecurityQuestions()
  }, [])

  const questionChangeHandler = (question) => {
    setQuestion(question)
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="questionsLabel">Question</InputLabel>
        <Select
          className={classes.questionSelect}
          labelId="questionsLabel"
          id={classes.questions}
          value={question}
          label="Question"
          onChange={(e) => questionChangeHandler(e.target.value)}
          multiline
        >
          {securityQuestions &&
            securityQuestions.map((securityQuestion) => (
              <MenuItem
                id={classes.questions}
                key={securityQuestion.id}
                value={securityQuestion.id}
                divider="true"
              >
                {securityQuestion.question}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <SecurityQuestionAnswer />
      <Button onClick={() => console.log(securityQuestions)}>test</Button>
    </>
  )
}

export default RegisterSecurityQuestions
