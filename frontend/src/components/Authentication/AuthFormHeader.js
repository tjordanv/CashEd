import Typography from "@mui/material/Typography"

import classes from "../Authentication/AuthFormHeader.module.css"
import logo from "../../assets/tempLogo.png"

const AuthFormHeader = ({ pageTitle }) => {
  return (
    <div className={classes.wrapper}>
      <img src={logo} alt="Logo" />
      <Typography variant="h4">CashEd</Typography>
      <Typography variant="body">Know Your Money</Typography>
      <Typography variant="h6">{pageTitle}</Typography>
    </div>
  )
}
export default AuthFormHeader
