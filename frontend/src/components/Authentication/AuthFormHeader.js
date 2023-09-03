import Typography from "@mui/material/Typography"

import classes from "../Authentication/AuthFormHeader.module.css"
import logo from "../../tempLogo.png"

const AuthFormHeader = () => {
  return (
    <div>
      <img src={logo} alt="Logo" className={classes.logo} />
      <Typography variant="h4">CashEd</Typography>
      <Typography sx={{ marginBottom: "auto" }} variant="body">
        Know Your Money
      </Typography>
    </div>
  )
}
export default AuthFormHeader
