import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { NavLink } from "react-router-dom"

import classes from "./Auth.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "../HelperComponents/ErrorMessage"
import EmailInput from "./userRecovery/EmailInput"
import UsernameInput from "./UsernameInput"

const UserLookup = ({ setUserHandler, isPasswordReset }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    email: { isError: false, message: "" },
    username: { isError: false, message: "" }
  })

  const getUserIdByEmail = async (e) => {
    e.preventDefault()

    let params = {
      emailAddress: emailAddress
    }
    if (isPasswordReset) params.username = username

    try {
      const emailResponse = await fetch(
        `http://localhost:8080/auth/getUserIdByEmailAndUsername?${new URLSearchParams(
          params
        )}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!emailResponse.ok) throw await FetchError.fromResponse(emailResponse)

      const userId = await emailResponse.json()
      if (userId !== 0) {
        setUserHandler({ id: userId, username: username, email: emailAddress })
      } else {
        throw new Error("Email Address not Found")
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <form onSubmit={getUserIdByEmail} className={classes.form}>
      <Box className={classes.container}>
        <Typography variant="body1">
          Please enter the email address associated with your account.
        </Typography>
        <EmailInput
          email={emailAddress}
          setEmailHandler={setEmailAddress}
          error={errors.email}
        />
        {isPasswordReset && (
          <UsernameInput
            username={username}
            setUsernameHandler={setUsername}
            error={errors.username}
          />
        )}
        <ErrorMessage message={message} />
        <Button type="submit" variant="contained" className={classes.button}>
          Next
        </Button>
        <NavLink to="/auth/login" className={classes.navLink}>
          Cancel
        </NavLink>
      </Box>
    </form>
  )
}

export default UserLookup
