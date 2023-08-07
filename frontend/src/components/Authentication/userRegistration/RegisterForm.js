import { useState } from "react"

import { NavLink } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../../HelperComponents/ErrorMessage"
import { validatePassword } from "../PasswordInput"
import PasswordInput from "../PasswordInput"
import InputError from "../../HelperComponents/InputError"
import { validateUsername } from "../UsernameInput"

const RegisterForm = ({ setUserHandler }) => {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    username: { isError: false, message: "" },
    emailAddress: { isError: false, message: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
  })

  const setErrorHandler = (error) => {
    setErrors((prevState) => ({
      ...prevState,
      [error.inputField]: { isError: error.isError, message: error.message }
    }))
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
      // Check that the password meets baseline criteria before attempting to register
      if (!validatePassword(password)) {
        console.log(password)
        errorList.push(
          new InputError(
            "Password must contain at least one uppercase, one number, one special character (@$!%*?&) and be at least 8 characters long.",
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

      // Reset username error state if successfully validated
      if (errors.username.isError) {
        setErrorHandler({
          inputField: "username",
          isError: false,
          message: ""
        })
      }

      // Reset email error state if successfully validated
      if (errors.emailAddress.isError) {
        setErrorHandler({
          inputField: "emailAddress",
          isError: false,
          message: ""
        })
      }

      // Check that the username and email address are valid and available.
      let usernameAndEmailResponse = await fetch(
        `http://localhost:8080/auth/checkUsernameAndEmail?${new URLSearchParams(
          { username: username, email: emailAddress }
        )}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!usernameAndEmailResponse.ok) {
        throw await FetchError.fromResponse(usernameAndEmailResponse)
      } else if (usernameAndEmailResponse.status === 200) {
        const usernameAndEmailResponseJson =
          await usernameAndEmailResponse.json()
        // Validate username
        if (!validateUsername(username)) {
          errorList.push(
            new InputError(
              "Username must be between 4 and 15 characters. The only valid special characters are (., _, -).",
              "username"
            )
          )
        } else if (usernameAndEmailResponseJson[0] === true) {
          errorList.push(new InputError("Username already taken.", "username"))
        }
        if (usernameAndEmailResponseJson[1] === true) {
          errorList.push(
            new InputError("Email address already taken.", "emailAddress")
          )
        }
      }

      // Handle any input errors
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

      let registerResponse = await fetch(
        "http://localhost:8080/auth/register",
        {
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
        }
      )
      if (!registerResponse.ok) {
        throw await FetchError.fromResponse(registerResponse)
      } else if (registerResponse.status === 200) {
        console.log("user not created")
        // handle this scenario; no input errors prevented register request but user not created
      }

      // If the user successfully registers, log them in.
      else if (registerResponse.status === 201) {
        let loginResponse = await fetch("http://localhost:8080/auth/login", {
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
        if (loginResponse.status === 200) {
          const loginResponseJson = await loginResponse.json()
          localStorage.setItem("jwt", loginResponseJson.accessToken)
          setUserHandler({
            id: loginResponseJson.id,
            username: loginResponseJson.username,
            email: loginResponseJson.email
          })
        }
      }
    } catch (error) {
      if (error instanceof InputError) {
        console.log("input error")
        // handle input error
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
          error={errors.emailAddress.isError}
          helperText={errors.emailAddress.message}
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
