import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import { NavLink } from "react-router-dom"
import classes from "./AuthFormFooter.module.css"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const AuthFormFooter = ({ type, formSection, setFormSection }) => {
  const tooltip =
    formSection === "recovery security questions"
      ? "Select and answer a security question to receive a recovery email."
      : type === "forgot password"
      ? "Enter the username and email address associated to your account."
      : type === "forgot username"
      ? "Enter the email address associated to your account."
      : type === "registration"
      ? "For additional security, please answer 3 security questions."
      : ""

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
      {type === "registration" && formSection === "register one" && (
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
        {type === "registration" && formSection === "register two" && (
          <NavLink
            onClick={() => setFormSection("one")}
            className={classes.navLink}
          >
            Back
          </NavLink>
        )}
      </>
      {(type === "forgot password" ||
        type === "forgot username" ||
        formSection === "registration security questions") &&
        formSection !== "user recovery response" && (
          <div className={classes.subContainer}>
            <div className={classes.userRecoverySubContainer}>
              {formSection !== "recovery security questions" &&
                formSection !== "registration security questions" && (
                  <>
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
                  </>
                )}
            </div>
            <Tooltip title={tooltip} placement="top">
              <HelpOutlineIcon className={classes.helpIcon} />
            </Tooltip>
          </div>
        )}
      {formSection === "user recovery response" && (
        <NavLink to="/login" className={classes.navLink}>
          Login
        </NavLink>
      )}
    </div>
  )
}

export default AuthFormFooter
