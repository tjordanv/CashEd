import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import classes from "./Auth.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "../HelperComponents/ErrorMessage"
import PasswordInput from "./PasswordInput"
import UsernameInput from "./UsernameInput"
import InputError from "../HelperComponents/InputError"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ isError: false, message: "" })
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const logInHandler = async (e) => {
    e.preventDefault()

    try {
      let response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      }
      if (response.status === 200) {
        // Check that there is a loginDTO response before attempting to parse JSON data
        const responseText = await response.text()

        if (responseText) {
          const responseJson = JSON.parse(responseText)
          // Store the returned access token if user is successfully authenticated
          localStorage.setItem("jwt", responseJson.accessToken)
          navigate("/")
        } else {
          throw new InputError()
        }
      }
    } catch (error) {
      if (error instanceof FetchError) {
        setMessage(error.message)
      } else {
        setError({
          username: {
            isError: true,
            message: ""
          },
          password: {
            isError: true,
            message: "Username and Password do not match."
          }
        })
      }
    }
  }

  return (
    <form onSubmit={logInHandler} className={classes.container}>
      <UsernameInput
        username={username}
        setUsernameHandler={setUsername}
        error={error.username}
      />
      <PasswordInput
        password={password}
        inputHandler={setPassword}
        error={error.password}
      />
      <Button type="submit" variant="contained" className={classes.button}>
        Log in
      </Button>
      <FormControlLabel
        control={<Switch />}
        label="Remember Me"
        className={classes.switch}
      />
      <ErrorMessage message={message} />
    </form>
  )
}

export default LoginForm
