import Typography from "@mui/material/Typography"

import classes from "../Authentication/AuthFormHeader.module.css"
import logo from "../../assets/tempLogo.png"

const AuthFormHeader = () => {
  return (
    <div className={classes.wrapper}>
      <img src={logo} alt="Logo" />
      <Typography variant="h4">CashEd</Typography>
      <Typography className={classes.bottom} variant="body">
        Know Your Money
      </Typography>
    </div>
  )
}
export default AuthFormHeader
