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

export default UsernameInput
