import TextField from "@mui/material/TextField"
import classes from "./InputFields.module.css"

const MessageInput = ({ message, setMessageHandler, error }) => {
  return (
    <TextField
      multiline
      rows={5}
      required
      label="Message"
      value={message}
      onChange={(e) => setMessageHandler(e.target.value)}
      className={classes.inputField}
      error={error.isError}
      helperText={error.message}
    />
  )
}

MessageInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default MessageInput
