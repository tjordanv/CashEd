import Typography from "@mui/material/Typography"

import classes from "./FormHeader.module.css"

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
