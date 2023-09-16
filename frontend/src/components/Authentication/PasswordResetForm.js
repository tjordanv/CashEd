import { redirect, useLoaderData } from "react-router-dom"
import { useState } from "react"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import ErrorMessage from "../HelperComponents/ErrorMessage"
import PasswordInput, { validatePassword } from ".//PasswordInput"
import classes from "./Auth.module.css"
import InputError from "../HelperComponents/InputError"
import FetchError from "../HelperComponents/FetchError"

// validate the token from the URL before allowing users onto this page
const passwordResetLoader = async (token) => {
  const response = await fetch(
    `http://localhost:8080/auth/verifyToken?${new URLSearchParams({
      token: token
    })}`,
    {}
  )

  if (!response.ok) {
    console.log("response not ok")
    //return redirect("/auth/login")
  } else {
    try {
      return await response.json()
    } catch (error) {
      // Send the user back to the login page if they do not have a valid token
      return redirect("/login")
      // If their token is valid but expired, let them know that and give them a link back to the reset password starter page
    }
    // console.log(responseJson)
    // console.log(user)
  }
  return null
}

const PasswordResetForm = ({ setIsResetHandler }) => {
  const userData = useLoaderData()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
  })
  const [message, setMessage] = useState("")
  let errorList = []

  const setErrorHandler = (error) => {
    setErrors((prevState) => ({
      ...prevState,
      [error.inputField]: { isError: error.isError, message: error.message }
    }))
  }
  const resetErrors = () => {
    // reset any previous errors upon resubmission
    const tempErrors = { ...errors }
    for (const errorKey in tempErrors) {
      tempErrors[errorKey] = {
        isError: false,
        message: ""
      }
    }
    setErrors(tempErrors)
  }

  const resetPassword = async (e) => {
    e.preventDefault()
    resetErrors()
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
          setErrorHandler({
            inputField: error.getInputName(),
            isError: true,
            message: error.getMessage()
          })
        })
        throw new InputError()
      }

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
          //navigate("/login")
          setIsResetHandler(true)
        }
      }
    } catch (error) {
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={resetPassword}>
      <Box className={classes.container}>
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
        <Button type="submit" variant="contained" className={classes.button}>
          Create Account
        </Button>
        <ErrorMessage message={message} />
      </Box>
    </form>
  )
}

export { passwordResetLoader }

export default PasswordResetForm
