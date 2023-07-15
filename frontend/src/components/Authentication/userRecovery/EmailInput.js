import { useState } from "react"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { NavLink } from "react-router-dom"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../../HelperComponents/ErrorMessage"

const EmailInput = ({ email, setEmailHandler, error }) => {
  return (
    <TextField
      variant="outlined"
      label="Email Address"
      type="email"
      name="emailAddress"
      required
      value={email}
      onChange={(e) => setEmailHandler(e.target.value)}
      className={classes.inputField}
      size="small"
      error={error.isError}
      helperText={error.message}
    />
  )
}

export default EmailInput
