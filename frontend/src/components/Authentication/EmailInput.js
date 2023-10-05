import TextField from "@mui/material/TextField"
import classes from "./InputFields.module.css"

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

EmailInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default EmailInput
