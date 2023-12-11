import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import { NavLink } from "react-router-dom"
import classes from "./FormFooter.module.css"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { Box, Stack } from "@mui/material"

/**
 * @description The footer for the auth forms. Includes links to other pages, back button, and info tooltips. All params are optional and the label for each link object is also optional
 * @param {object} doubleLink the object used to render a double link such as the one on the login page for forgot username and forgot password. 
 * example: {
      label: " Having trouble logging in?",
      firstLink: {
        to: "/userRecovery/forgotUsername",
        text: "Forgot Username"
      },
      secondLink: {
        to: "/userRecovery/forgotPassword",
        text: "Forgot Password"
      }
    },
 * @param {object} topLink the object used to render a single navigation link. Renders below the double link but above the bottom link
 * example: {
      to: "/register",
      text: "Create an Account",
      label: "Need an account?"
    }
 * @param {object} bottomLink the object used to render a single navigation link. Renders below both the double link and the top link
 * @param {string} tooltip the string that will display as the tooltip
 */
const FormFooter = ({ doubleLink, topLink, bottomLink, tooltip }) => {
  return (
    <Box className={classes.container}>
      <Stack spacing={2} className={classes.subContainer}>
        {doubleLink && (
          <div>
            <Typography>{doubleLink.label}</Typography>
            <Box className={classes.doubleLinkContainer}>
              <NavLink to={doubleLink.firstLink.to} className={classes.navLink}>
                {doubleLink.firstLink.text}
              </NavLink>
              <span>|</span>
              <NavLink
                to={doubleLink.secondLink.to}
                className={classes.navLink}
              >
                {doubleLink.secondLink.text}
              </NavLink>
            </Box>
          </div>
        )}
        {topLink && (
          <div>
            {topLink.label && <Typography>{topLink.label}</Typography>}
            <NavLink
              to={topLink.to}
              className={classes.navLink}
              onClick={topLink.onClick}
            >
              {topLink.text}
            </NavLink>
          </div>
        )}
        {bottomLink && (
          <div>
            {bottomLink.label && <Typography>{bottomLink.label}</Typography>}
            <NavLink to={bottomLink.to} className={classes.navLink}>
              {bottomLink.text}
            </NavLink>
          </div>
        )}
      </Stack>
      {tooltip && (
        <Tooltip title={tooltip} placement="top">
          <HelpOutlineIcon className={classes.helpIcon} />
        </Tooltip>
      )}
    </Box>
  )
}
export default FormFooter
