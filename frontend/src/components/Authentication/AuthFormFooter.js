import Typography from "@mui/material/Typography"
import { NavLink } from "react-router-dom"
import classes from "./AuthFormFooter.module.css"

const AuthFormFooter = ({
  isRegistration,
  registrationPart,
  setRegistrationPart
}) => {
  return (
    <div className={classes.container}>
      {!isRegistration && (
        <>
          <Typography className={classes.navLinkLabel}>
            Having trouble logging in?
          </Typography>
          <div className={classes.userRecoveryContainer}>
            <NavLink
              to="/userRecovery/forgotUsername"
              className={classes.navLink}
            >
              Forgot Username
            </NavLink>
            |
            <NavLink
              to="/userRecovery/resetPassword"
              className={classes.navLink}
            >
              Forgot Password
            </NavLink>
          </div>
          <Typography className={classes.navLinkLabel}>
            Need an account?
          </Typography>
          <NavLink to="/register" className={classes.navLink}>
            Create Account
          </NavLink>
        </>
      )}
      {registrationPart === "one" && (
        <>
          <Typography className={classes.navLinkLabel}>
            Already have an account?
          </Typography>
          <NavLink to="/login" className={classes.navLink}>
            Log In
          </NavLink>
        </>
      )}
      <>
        {registrationPart === "two" && (
          <NavLink
            onClick={() => setRegistrationPart("one")}
            className={classes.navLink}
          >
            Back
          </NavLink>
        )}
      </>
    </div>
  )
}

export default AuthFormFooter
