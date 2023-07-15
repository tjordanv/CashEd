import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import { Outlet } from "react-router-dom"

import classes from "../Authentication/Header.module.css"

const AuthHeader = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography sx={{ marginBottom: "auto" }} variant="h4">
          Finance App
        </Typography>
        <Outlet />
      </Box>
    </div>
  )
}
export default AuthHeader
