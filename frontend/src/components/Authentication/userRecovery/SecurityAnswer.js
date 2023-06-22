import { useEffect, useState } from "react"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import classes from "../LoginAndRegisterForms.module.css"
import FetchError from "../../HelperComponents/FetchError"

const SecurityQAndAContainer = ({ answerId, setIsAuthenticatedHandler }) => {
  const [answer, setAnswer] = useState("")

  const validateAnswer = async (e) => {
    console.log("in")
    e.preventDefault()
    try {
      console.log("start")
      const response = await fetch(
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
      console.log("end")
      if (!response.ok) {
        console.log("errorrrr")
        throw await FetchError.fromResponse(response)
      }
      if (response.status === 200) {
        const responseJson = await response.json()
        console.log(responseJson)
        if (responseJson === true) setIsAuthenticatedHandler()
        console.log(responseJson)
      } else {
        console.log("reseJson")
        throw await FetchError.fromResponse(response)
      }
    } catch (error) {
      console.log("huuuh")
      if (error instanceof FetchError) console.log(error.message)
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
    </form>
  )
}

export default SecurityQAndAContainer
