import {
  redirect,
  useParams,
  useLoaderData,
  useNavigate
} from "react-router-dom"
import { useEffect, useState } from "react"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import ErrorMessage from "../../components/HelperComponents/ErrorMessage"
import PasswordInput, {
  validatePassword
} from "../../components/Authentication/PasswordInput"
import classes from "../../components/Authentication/Auth.module.css"
import InputError from "../../components/HelperComponents/InputError"
import FetchError from "../../components/HelperComponents/FetchError"

// validate the token from the URL before allowing users onto this page
const loader = async (token) => {
  let user
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
      return redirect("/auth/login")
      // If their token is valid but expired, let them know that and give them a link back to the reset password starter page
    }
    // console.log(responseJson)
    // console.log(user)
  }
  return null
}

const PasswordReset = () => {
  const userData = useLoaderData()
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ isError: false, message: "" })
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const resetPassword = async (e) => {
    e.preventDefault()

    try {
      if (!validatePassword(password)) {
        throw new InputError(
          "Password must contain at least one uppercase, one number, one special character and be at least 8 characters long."
        )
      } else {
        console.log(userData)
        let response = await fetch(
          "http://localhost:8080/auth/updatePassword",
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: userData.id, password: password })
          }
        )
        if (!response.ok) {
          throw new FetchError.fromResponse(response)
        } else if (response.status === 200) {
          const responseJson = await response.json()
          if (responseJson === true) {
            navigate("/auth/login")
          }
        }
      }
      // Send request to update password if valid
    } catch (error) {
      if (error instanceof InputError) {
        setError({ isError: true, message: error.getMessage() })
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={resetPassword}>
      <Box className={classes.container}>
        <PasswordInput
          password={password}
          inputHandler={setPassword}
          error={error}
        />

        <Button type="submit" variant="contained" className={classes.button}>
          Create Account
        </Button>
        <ErrorMessage message={message} />
      </Box>
    </form>
  )
}

export { loader }

export default PasswordReset
