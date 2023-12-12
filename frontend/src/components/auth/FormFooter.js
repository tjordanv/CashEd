import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import { NavLink } from "react-router-dom"
import classes from "./FormFooter.module.css"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { Box, Stack } from "@mui/material"

/**
 * @description The footer for the auth forms. Includes links to other pages, back button, and info tooltips. All params are optional but <b>at least one link must be provided</b>.
 * @param {object} [doubleLink] - the object used to render a double link such as the one on the login page for forgot username and forgot password. 
 * @param {string} doubleLink.label - the string that will display above the double link
 * @param {object} doubleLink.firstLink - the object used to render the first link in the double link. The object has the same structure as the topLink and bottomLink objects.
 * @param {object} doubleLink.secondLink - the object used to render the second link in the double link The object has the same structure as the topLink and bottomLink objects.
 * @param {object} [topLink] - the object used to render a single navigation link. Renders below the double link but above the bottom link
 * @param {string} [topLink.label] - the string that will display above the top link  
 * @param {object} topLink.to - the router path that the NavLink will follow.
 * @param {string} topLink.text - the string that will display as the NavLink text.
 * @param {object} [bottomLink] - the object used to render a single navigation link. Renders below both the double link and the top link. 
 * @param {string} [bottomLink.label] - the string that will display above the bottom link
 * @param {object} bottomLink.to - the router path that the NavLink will follow.
 * @param {string} bottomLink.text - the string that will display as the NavLink text.
 * @param {string} [tooltip] - the string that will display as the tooltip
 * @returns {JSX.Element} - the footer for the auth forms
 * @example 
 * // topLink object with label
 * const footerData = {
     to: "/register",
     text: "Create an Account",
     label: "Need an account?"
   }
   <FormFooter topLink={footerData} />
 * @example
 * // topLink and bottomLink objects
 * const footerData = {
   topLink: {
     to: "/userRecovery/forgotUsername",
        text: "Forgot Username"
      },
      bottomLink: {
        to: "/login",
        text: "Cancel",
      }
    }
    <FormFooter topLink={footerData.topLink} bottomLink={footerData.bottomLink} />     
 * @example 
 * // doubleLink object
 * const footerData = {
   label: " Having trouble logging in?",
   firstLink: {
           to: "/userRecovery/forgotUsername",
           text: "Forgot Username"
         },
         secondLink: {
           to: "/userRecovery/forgotPassword",
           text: "Forgot Password"
         }
       }
       <FormFooter doubleLink={footerData} />
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
