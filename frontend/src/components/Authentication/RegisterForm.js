import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "./Auth.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "../HelperComponents/ErrorMessage"
import validatePasswordCriteria from "../HelperFunctions/validatePasswordCriteria"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [inputErrors, setInputError] = useState([
    { name: "username", error: false },
    { name: "password", error: false },
    { namw: "email", error: false }
  ])

  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()

    try {
      // Check that the password meets baseline criteria before attempting to register
      if (!validatePasswordCriteria(password)) {
        setInputError((prevState) =>
          prevState.map((input) => input.name === "username")
        )
        throw new Error(
          "Password must contain at least one uppercase, one number, one special character and be at least 8 characters long."
        )
      }

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
          const responseJson = await response.json()
          localStorage.setItem("jwt", responseJson.accessToken)
          navigate("/")
        }
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <form className={classes.form} onSubmit={registerHandler}>
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
          label="Email Address"
          name="emailAddress"
          type="email"
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
          error={inputErrors.password}
          helperText={inputErrors.password ? "helper text" : ""}
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
        <NavLink to="/auth/login" className={classes.navLink}>
          Log In
        </NavLink>
      </Box>
    </form>
  )
}

export default RegisterForm
