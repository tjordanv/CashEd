import Typography from "@mui/material/Typography"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"

const RecoveryResponse = ({ isPasswordReset }) => {
  return (
    <Box className={classes.form}>
      <Box className={classes.container}>
        {!isPasswordReset && (
          <>
            <Typography className={classes.recoveryResponse}>
              Thank you for confirming your account
            </Typography>

            <Typography className={classes.recoveryResponse}>
              Check your email for your login information
            </Typography>
          </>
        )}
        {isPasswordReset && (
          <Typography className={classes.recoveryResponse}>
            Your password has been successfully updated
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default RecoveryResponse
