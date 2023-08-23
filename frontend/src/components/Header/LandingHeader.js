import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

import walletIcon from "../../assets/walletIcon.png"

import { NavLink } from "react-router-dom"
import classes from "./LandingHeader.module.css"

const LandingHeader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <div>
          <Typography variant="h4" className={classes.title}>
            Finance App
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            The Finance Tracker
          </Typography>
        </div>
        <img src={walletIcon} alt="logo"></img>
      </div>
      <Stack
        direction="row"
        spacing={4}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
        alignItems="center"
      >
        <NavLink className={classes.navLink} to="/home">
          Home
        </NavLink>
        <NavLink className={classes.navLink} to="AboutUs">
          About Us
        </NavLink>
        <NavLink className={classes.navLink} to="Contact">
          Contact
        </NavLink>
        <NavLink className={classes.navLink} to="/auth/login">
          Login
        </NavLink>
        <NavLink className={classes.navLink} to="/auth/register">
          Register
        </NavLink>
      </Stack>
    </div>
  )
}
export default LandingHeader
