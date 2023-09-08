import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
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
              to="/userRecovery/forgotPassword"
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
      {(type === "forgot password" || type === "forgot username") && (
        <div className={classes.subContainer}>
          <div className={classes.userRecoverySubContainer}>
            <NavLink
              to={`/userRecovery/forgot${
                type === "forgot password" ? "Username" : "Password"
              }`}
              className={classes.navLink}
            >
              {type === "forgot password"
                ? "Forgot Username"
                : "Forgot Password"}
            </NavLink>
            <NavLink to="/login" className={classes.navLink}>
              Cancel
            </NavLink>
          </div>
          <Tooltip
            title={`Enter the ${
              type === "forgot password" ? "username and " : ""
            }email address associated to your account.`}
            placement="top"
          >
            <HelpOutlineIcon className={classes.helpIcon} />
          </Tooltip>
        </div>
      )}
      {type === "security questions" && (
        <div className={classes.subContainer}>
          <NavLink to="/login" className={classes.navLink}>
            Cancel
          </NavLink>
          <Tooltip
            title={
              "Select and answer a security question to receive a recovery email."
            }
            placement="top"
          >
            <HelpOutlineIcon className={classes.helpIcon} />
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default AuthFormFooter
