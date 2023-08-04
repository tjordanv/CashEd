import { useState } from "react"

import TextField from "@mui/material/TextField"

import classes from "./Auth.module.css"

const UsernameInput = ({ username, setUsernameHandler, error }) => {
  return (
    <TextField
      required
      variant="outlined"
      label="Username"
      size="small"
      value={username}
      onChange={(e) => setUsernameHandler(e.target.value)}
      className={classes.inputField}
      error={error.isError}
      helperText={error.message}
    />
  )
}

UsernameInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default UsernameInput

const validateUsername = ({ username }) => {
  const regex = /^[a-zA-Z0-9.,_-]{4,15}$/
  console.log(username)
  console.log(regex.test(username))
  return regex.test(username)
}

export { validateUsername }
