import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "./LoginAndRegisterForms.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "./ErrorMessage"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const logInHandler = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: emailAddress,
          password: password,
          confirmPassword: confirmPassword,
          role: "USER"
        })
      })
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      }
      // If the user successfully registers, log them in.
      if (response.status === 201) {
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
          setMessage("Account created but an error occurred. Please login.")
        }
      }
    } catch (error) {
      if (error instanceof FetchError) setMessage(error.message)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={logInHandler}>
        <Box className={classes.container}>
          <Typography variant="h4" className={classes.header}>
            Finance App
          </Typography>
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
            label="Email Address"
            name="emailAddress"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
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
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.inputField}
            size="small"
          />
          <ErrorMessage message={message} />
          <Button type="submit" variant="contained" className={classes.button}>
            Create Account
          </Button>
          <Typography className={classes.navLinkLabel}>
            Already have an account?
          </Typography>
          <NavLink to="/login" className={classes.navLink}>
            Log In
          </NavLink>
        </Box>
      </form>
    </div>
  )
}

export default RegisterForm
