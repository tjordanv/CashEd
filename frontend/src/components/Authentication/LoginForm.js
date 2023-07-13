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

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
        try {
          const responseJson = await response.json()
          localStorage.setItem("jwt", responseJson.accessToken)
          navigate("/")
        } catch (error) {
          setMessage("Error authenticating")
        }
      }
    } catch (error) {
      if (error instanceof FetchError) setMessage(error.message)
    }
  }

  return (
    <form onSubmit={logInHandler} className={classes.form}>
      <Box className={classes.container}>
        <TextField
          variant="outlined"
          label="Username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.inputField}
          size="small"
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.inputField}
          size="small"
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
