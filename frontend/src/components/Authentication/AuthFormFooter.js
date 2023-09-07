import Typography from "@mui/material/Typography"
import { NavLink } from "react-router-dom"
import classes from "./AuthFormFooter.module.css"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const AuthFormFooter = ({ type, registrationPart, setRegistrationPart }) => {
  return (
    <div className={classes.container}>
      {type === "login" && (
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
      {type === "registration" && registrationPart === "one" && (
        <>
          <Typography className={classes.navLinkLabel}>
            Already have an account?
          </Typography>

          <NavLink to="/login" className={classes.navLink}>
            Login
          </NavLink>
        </>
      )}
      <>
        {type === "registration" && registrationPart === "two" && (
          <NavLink
            onClick={() => setRegistrationPart("one")}
            className={classes.navLink}
          >
            Back
          </NavLink>
        )}
      </>
      {type === "username recovery" && (
        <div className={classes.subContainer}>
          <NavLink to="/login" className={classes.navLink}>
            Cancel
          </NavLink>
          <HelpOutlineIcon className={classes.helpIcon} />
        </div>
      )}
    </div>
  )
}

export default AuthFormFooter
