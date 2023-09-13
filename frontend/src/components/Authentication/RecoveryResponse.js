import Typography from "@mui/material/Typography"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"

const RecoveryResponse = () => {
  return (
    <Box className={classes.form}>
      <Box className={classes.container}>
        <Typography className={classes.recoveryResponse}>
          Thank you for confirming your account
        </Typography>

        <Typography className={classes.recoveryResponse}>
          Check your email for your login information
        </Typography>
      </Box>
    </Box>
  )
}

export default RecoveryResponse
