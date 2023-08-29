import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import { Outlet } from "react-router-dom"

import classes from "../Authentication/Header.module.css"
import logo from "../../tempLogo.png"

const AuthHeader = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <Typography sx={{ marginBottom: "auto" }} variant="h4">
          Finance App
        </Typography>
        <Outlet />
      </Box>
    </div>
  )
}
export default AuthHeader
