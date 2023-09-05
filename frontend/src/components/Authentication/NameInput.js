import TextField from "@mui/material/TextField"

import classes from "./Auth.module.css"

const NameInput = ({ name, setNameHandler, error, isLastName }) => {
  return (
    <TextField
      required
      variant="outlined"
      label={isLastName ? "Last Name " : "First Name"}
      size="small"
      value={name}
      onChange={(e) => setNameHandler(e.target.value)}
      className={classes.inputField}
      error={error.isError}
      helperText={error.message}
    />
  )
}

NameInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default NameInput

const validateName = (name) => {
  const regex = /^[a-zA-Z]{1,30}$/

  if (typeof name !== "string" || name.trim().length === 0) {
    return false
  }

  return regex.test(name.trim())
}

export { validateName }
