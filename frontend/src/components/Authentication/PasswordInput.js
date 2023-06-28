import { useState } from "react"

import TextField from "@mui/material/TextField"

import classes from "./Auth.module.css"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { InputAdornment, IconButton } from "@mui/material"

const PasswordInput = ({ password, inputHandler, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <TextField
      variant="outlined"
      label="Password"
      type={isPasswordVisible ? "text" : "password"}
      name="password"
      error={error.isError}
      helperText={error.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="show password"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      required
      value={password}
      onChange={(e) => inputHandler(e.target.value)}
      className={classes.inputField}
      size="small"
    />
  )
}

export default PasswordInput
