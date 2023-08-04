import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"

import classes from "./Auth.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "../HelperComponents/ErrorMessage"
import PasswordInput from "./PasswordInput"
import UsernameInput from "./UsernameInput"

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
    } catch (error) {
      if (error instanceof FetchError) {
        setMessage(error.message)
      } else {
        console.log(error.message)
      }
    }
  }

  return (
    <form onSubmit={logInHandler} className={classes.form}>
      <Box className={classes.container}>
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
        <ErrorMessage message={message} />
        <Button type="submit" variant="contained" className={classes.button}>
          Log in
        </Button>
        <FormControlLabel
          control={<Switch />}
          label="Remember Me"
          className={classes.switch}
        />
        <Typography className={classes.navLinkLabel}>
          Having trouble logging in?
        </Typography>
        <div className={classes.userRecoveryContainer}>
          <NavLink
            to="/auth/userRecovery/forgotUsername"
            className={classes.navLink}
          >
            Forgot Username
          </NavLink>
          |
          <NavLink
            to="/auth/userRecovery/resetPassword"
            className={classes.navLink}
          >
            Forgot Password
          </NavLink>
        </div>
        <Typography className={classes.navLinkLabel}>
          Need an account?
        </Typography>
        <NavLink to="/auth/register" className={classes.navLink}>
          Create Account
        </NavLink>
      </Box>
    </form>
  )
}

export default LoginForm
