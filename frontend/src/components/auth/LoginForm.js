import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import PasswordInput from "../../uiComponents/PasswordInput"
import UsernameInput from "../../uiComponents/UsernameInput"
import { InputError } from "../../utils/inputErrors"
import FormButton from "../../uiComponents/FormButton"
import FormFooter from "./FormFooter"

/**
 * @description The login form for the login page
 * @example <LoginForm />
 * @returns {JSX.Element} - the login form
 */
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

  const footerData = {
    doubleLink: {
      label: " Having trouble logging in?",
      firstLink: {
        to: "/userRecovery/forgotUsername",
        text: "Forgot Username"
      },
      secondLink: {
        to: "/userRecovery/forgotPassword",
        text: "Forgot Password"
      }
    },
    bottomLink: {
      to: "/register",
      text: "Create an Account",
      label: "Need an account?"
    }
  }

  return (
    <>
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
        <FormButton label="Log In" type="submit" />
        <FormControlLabel
          control={<Switch />}
          label="Remember Me"
          className={classes.switch}
        />
        <ErrorMessage message={message} />
      </form>
      <FormFooter
        doubleLink={footerData.doubleLink}
        bottomLink={footerData.bottomLink}
      />
    </>
  )
}

export default LoginForm
