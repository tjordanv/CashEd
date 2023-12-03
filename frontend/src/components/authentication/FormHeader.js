import Typography from "@mui/material/Typography"

import classes from "./FormHeader.module.css"

/**
 * The standardized header for all authentication forms
 * @param {string} pageTitle the title of the page/form to display
 */
const AuthFormHeader = ({ pageTitle }) => {
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4">CashEd</Typography>
      <Typography variant="body">Know Your Money</Typography>
      <Typography variant="h6">{pageTitle}</Typography>
    </div>
  )
}
export default AuthFormHeader
