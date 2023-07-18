import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../../HelperComponents/ErrorMessage"
import validatePasswordCriteria from "../../HelperFunctions/validatePasswordCriteria"
import PasswordInput from "../PasswordInput"
import InputError from "../../HelperComponents/InputError"

const RegisterForm = ({ setUserHandler }) => {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    username: { isError: false, message: "", username: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
  })

  const navigate = useNavigate()

  const setErrorHandler = (error) => {
    console.log(error.username)
    if (error.username) {
      setErrors((prevState) => ({
        ...prevState,
        [error.inputField]: {
          isError: error.isError,
          message: error.message,
          username: error.username
        }
      }))
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [error.inputField]: { isError: error.isError, message: error.message }
      }))
    }
  }

  const setPasswordHandler = (newPassword) => {
    setPassword(newPassword)
  }
  const setConfirmPasswordHandler = (newPassword) => {
    setConfirmPassword(newPassword)
  }

  const registerHandler = async (e) => {
    e.preventDefault()

    let errorList = []

    try {
      // If username was set to an error state but the username has since changed, clear the error state.
      // This does not necessarily indicate that the username is not taken but without resetting the error state here, it will permanently appear as taken
      // console.log(errors.username)
      // console.log(username)
      // console.log(errors.username.username)
      if (errors.username.isError && errors.username.username !== username) {
        setErrorHandler({
          inputField: "username",
          isError: false,
          message: ""
          //username: username
        })
      }

      // Check that the password meets baseline criteria before attempting to register
      if (!validatePasswordCriteria(password)) {
        errorList.push(
          new InputError(
            "Password must contain at least one uppercase, one number, one special character and be at least 8 characters long.",
            "password"
          )
        )
      }

      // Reset password error state if successfully validated
      if (errors.password.isError) {
        setErrorHandler({
          inputField: "password",
          isError: false,
          message: ""
        })
      }

      // Check that password and confirm password match
      if (password !== confirmPassword) {
        errorList.push(
          new InputError("Passwords must match.", "confirmPassword")
        )
      }

      // Reset confirm password error state if passwords match
      if (errors.confirmPassword.isError) {
        setErrorHandler({
          inputField: "confirmPassword",
          isError: false,
          message: ""
        })
      }

      if (errorList.length > 0) {
        errorList.forEach((error) => {
          setErrorHandler({
            inputField: error.getInputName(),
            isError: true,
            message: error.getMessage()
          })
        })
        throw new InputError()
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
      } else if (response.status === 200) {
        throw new InputError("Username already taken.", "username")
      }

      // If the user successfully registers, log them in.
      else if (response.status === 201) {
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
          setUserHandler({
            id: responseJson.id,
            username: responseJson.username,
            email: responseJson.email
          })
        }
      }
    } catch (error) {
      if (error instanceof InputError) {
        if (error.getInputName() === "username") {
          setErrorHandler({
            inputField: error.getInputName(),
            isError: true,
            message: error.getMessage(),
            username: username
          })
        }
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={registerHandler}>
      <Box className={classes.container}>
        <TextField
          variant="outlined"
          label="Username"
          name="username"
          error={errors.username.isError}
          helperText={errors.username.message}
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
        <PasswordInput
          password={password}
          inputHandler={setPasswordHandler}
          error={errors.password}
        />
        <PasswordInput
          password={confirmPassword}
          inputHandler={setConfirmPasswordHandler}
          error={errors.confirmPassword}
          isConfirmation={true}
        />
        <Button type="submit" variant="contained" className={classes.button}>
          Create Account
        </Button>
        <ErrorMessage message={message} />
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
