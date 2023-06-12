import classes from "./LoginAndRegisterForms.module.css"

import Typography from "@mui/material/Typography"

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.messageContainer}>
      {message && (
        <Typography variant="body2" className={classes.message}>
          {message}
        </Typography>
      )}
    </div>
  )
}

export default ErrorMessage
