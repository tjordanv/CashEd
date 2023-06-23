import { useState } from "react"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../LoginAndRegisterForms.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../ErrorMessage"

const EmailLookup = ({ setUserIdHandler }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")

  const getUserIdByEmail = async (e) => {
    e.preventDefault()

    try {
      const userResponse = await fetch(
        `http://localhost:8080/auth/getUserIdByEmail?${new URLSearchParams({
          emailAddress: emailAddress
        })}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!userResponse.ok) throw await FetchError.fromResponse(userResponse)

      const userId = await userResponse.json()
      if (userId !== 0) {
        setUserIdHandler(userId)
      } else {
        throw new Error("Email Address not Found")
      }
    } catch (error) {
      setMessage(error.message)
      console.log(error.message)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={getUserIdByEmail}>
        <Box className={classes.container}>
          <Typography variant="h4" className={classes.header}>
            Finance App
          </Typography>
          <TextField
            variant="outlined"
            label="Email Address"
            type="email"
            name="emailAddress"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className={classes.inputField}
            size="small"
          />
          <ErrorMessage message={message} />
          <Button type="submit" variant="contained" className={classes.button}>
            Next
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default EmailLookup
