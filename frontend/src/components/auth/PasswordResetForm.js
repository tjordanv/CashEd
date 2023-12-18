import { redirect, useLoaderData } from "react-router-dom"
import { useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import PasswordInput, {
  validatePassword
} from "../../uiComponents/PasswordInput"
import classes from "./Auth.module.css"
import { InputError, setError, resetErrors } from "../../utils/inputErrors"
import FetchError from "../../utils/fetchError"
import FormFooter from "./FormFooter"
import FormButton from "../../uiComponents/FormButton"

/**
 * @async
 * @function passwordResetLoader
 * @description Validates the token from the URL before allowing users onto this page.
 * @param {Object} params - The URL parameters.
 * @param {Object} params.token - The token to be validated.
 * @param {string} token - The token to be validated.
 * @returns {Promise<Object|null>} - A promise that resolves to the response JSON object if the token is valid, or null if the token is invalid.
 */
const passwordResetLoader = async (token) => {
  const response = await fetch(
    `http://localhost:8080/auth/verifyToken?${new URLSearchParams({
      token: token
    })}`,
    {}
  )

  if (!response.ok) {
    console.log("response not ok")
  } else {
    try {
      return await response.json()
    } catch (error) {
      // Send the user back to the login page if they do not have a valid token
      return redirect("/login")
    }
  }
  return null
}
export { passwordResetLoader }

/**
 * @description The form for users to reset their login password
 * @param {function} setIsResetHandler - the handler to set the isReset state in the parent component that controls which part of the reset process to show
 * @example <PasswordResetForm setIsResetHandler={setIsResetHandler} />
 * @returns {JSX.Element} - the password reset form
 */
const PasswordResetForm = ({ setIsResetHandler }) => {
  const userData = useLoaderData()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
  })
  let errorList = []

  const resetPassword = async (e) => {
    e.preventDefault()
    resetErrors(errors, setErrors)
    setIsLoading(true)

    try {
      if (!validatePassword(password)) {
        errorList.push(
          new InputError(
            "Password must contain at least one uppercase, one number, one special character (@$!%*?&) and be at least 8 characters long.",
            "password"
          )
        )
      }
      if (password !== confirmPassword) {
        errorList.push(
          new InputError("Passwords must match.", "confirmPassword")
        )
      }

      if (errorList.length > 0) {
        errorList.forEach((error) => {
          setError(
            {
              inputField: error.getInputName(),
              isError: true,
              message: error.getMessage()
            },
            setErrors
          )
        })
        throw new InputError()
      }
      // if all inputs are valid, send reset request
      let response = await fetch("http://localhost:8080/auth/updatePassword", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userData.id, password: password })
      })
      if (!response.ok) {
        throw new FetchError.fromResponse(response)
      } else if (response.status === 200) {
        const responseJson = await response.json()
        if (responseJson === true) {
          setIsResetHandler(true)
        }
      }
    } catch (error) {
      if (error instanceof InputError) {
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
      setIsLoading(false)
    }
  }

  const footerData = {
    topLink: {
      to: "/login",
      text: "Cancel"
    },
    tooltip: "Enter your new password"
  }

  return (
    <>
      <form className={classes.container} onSubmit={resetPassword}>
        <PasswordInput
          password={password}
          inputHandler={setPassword}
          error={errors.password}
        />
        <PasswordInput
          password={confirmPassword}
          inputHandler={setConfirmPassword}
          error={errors.confirmPassword}
          isConfirmation={true}
        />
        <FormButton label="Reset Password" type="submit" />
        {isLoading && <CircularProgress className={classes.loader} />}
        <ErrorMessage message={message} />
      </form>
      <FormFooter topLink={footerData.topLink} tooltip={footerData.tooltip} />
    </>
  )
}

export default PasswordResetForm
