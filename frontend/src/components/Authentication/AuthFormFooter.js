import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import { NavLink } from "react-router-dom"
import classes from "./AuthFormFooter.module.css"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

/*
type: This is the type of auth form. Ex: Login form, Registration form, Password Reset for
formSection: This is the state of the form section for the forms that have multiple parts. 
  Ex: Registration form part 1 and part 2
setFormSection: This is a function the handles setting the formSection state 
*/
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
      : type === "password reset"
      ? "Enter your new password"
      : type === "contact"
      ? "Submit your contact information with a short descriptive message and we will reach out to your email shortly."
      : null

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
      {(type.startsWith("forgot") ||
        formSection === "registration security questions" ||
        type === "password reset" ||
        type === "contact") &&
        formSection !== "user recovery response" && (
          <div className={classes.subContainer}>
            <div className={classes.userRecoverySubContainer}>
              {!formSection.includes("security questions") &&
                type !== "password reset" &&
                type !== "contact" && (
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
                )}
              <NavLink to="/login" className={classes.navLink}>
                Cancel
              </NavLink>
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
      {type === "contact submitted" && (
        <NavLink to="/home" className={classes.navLink}>
          Home
        </NavLink>
      )}
    </div>
  )
}

AuthFormFooter.defaultProps = {
  formSection: ""
}
export default AuthFormFooter
