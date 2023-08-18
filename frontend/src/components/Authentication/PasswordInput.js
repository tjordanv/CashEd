import { useState } from "react"
import TextField from "@mui/material/TextField"
import classes from "./Auth.module.css"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { InputAdornment, IconButton } from "@mui/material"

const PasswordInput = ({ password, inputHandler, error, isConfirmation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <TextField
      variant="outlined"
      label={isConfirmation ? "Confirm Password" : "Password"}
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

PasswordInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default PasswordInput

const validatePassword = (password) => {
  // At least one uppercase, one number, one special character and minimum 8 characters
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (typeof password !== "string" || password.trim().length === 0) {
    return false
  }

  return regex.test(password)
}

export { validatePassword }
