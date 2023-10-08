import Typography from "@mui/material/Typography"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"

const RequestResponse = ({ type }) => {
  let text
  switch (type) {
    case "user recovery":
      text =
        "Thank you for confirming your account.\nCheck your email for your login information."
      break
    case "password reset":
      text = "Your password has been successfully updated"
      break
    default:
      text = ""
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.requestResponse}>{text}</Typography>
    </Box>
  )
}

export default RequestResponse
