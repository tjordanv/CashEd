import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import { Outlet } from "react-router-dom"

import classes from "../Authentication/AuthFormHeader.module.css"
import logo from "../../tempLogo.png"

const AuthFormHeader = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <Typography variant="h4">CashEd</Typography>
        <Typography sx={{ marginBottom: "auto" }} variant="body">
          Know Your Money
        </Typography>
        <Outlet />
      </Box>
    </div>
  )
}
export default AuthFormHeader
