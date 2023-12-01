import classes from "./ErrorMessage.module.css"

import Typography from "@mui/material/Typography"

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.container}>
      {message && (
        <Typography variant="body2" className={classes.message}>
          {message}
        </Typography>
      )}
    </div>
  )
}

export default ErrorMessage
