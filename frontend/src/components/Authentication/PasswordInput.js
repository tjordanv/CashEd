import { useState } from "react"

import TextField from "@mui/material/TextField"

import classes from "./Auth.module.css"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { InputAdornment, IconButton } from "@mui/material"

const PasswordInput = ({ error }) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  })

  const onChangeHandler = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <TextField
      variant="outlined"
      label="Password"
      type={values.showPassword ? "text" : "password"}
      name="password"
      error={error.isError}
      helperText={error.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="show password"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      required
      value={values.password}
      onChange={onChangeHandler("password")}
      className={classes.inputField}
      size="small"
    />
  )
}

export default PasswordInput
