import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import classes from "./LoginForm.module.css"
import { Typography } from "@mui/material"

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
        throw new Error("User Taken")
      }
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
          setMessage("Error")
          console.log(error)
        }
      }
    } catch (error) {
      setMessage("Error registering")
      console.log(error)
    }
  }

  return (
    <form onSubmit={logInHandler}>
      <Box className={classes.container}>
        <Stack spacing={1}>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.inputField}
          />
          <TextField
            variant="outlined"
            label="Email Address"
            name="emailAddress"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className={classes.inputField}
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
          />
          {message && <Typography>{message}</Typography>}
          <Button type="submit" variant="contained" className={classes.button}>
            Create Account
          </Button>
          <label>
            Already have an account? <NavLink to="/login">Log In</NavLink>
          </label>
        </Stack>
      </Box>
    </form>
  )
}

export default RegisterForm
