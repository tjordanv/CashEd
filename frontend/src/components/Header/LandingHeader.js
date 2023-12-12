import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import walletIcon from "../../assets/walletIcon.png"
import { NavLink, useLocation } from "react-router-dom"
import classes from "./LandingHeader.module.css"

/**
 * @description Renders the header component when the user is not authenticated.
 * @example <LandingHeader />
 * @returns {JSX.Element} The JSX element representing the landing header.
 */
const LandingHeader = () => {
  const location = useLocation()
  const [linkStates, setLinkStates] = useState({
    home: false,
    aboutUs: false,
    contact: false,
    login: false,
    register: false
  })

  /**
   * Updates the link states based on the current path.
   * @param {string} currentPath - The current path.
   */
  const setLinkStatesHandler = (currentPath) => {
    let prevPath = null
    for (const link in linkStates) {
      if (linkStates[link] === true) {
        prevPath = link
      }
    }
    setLinkStates((prevState) => ({
      ...prevState,
      [prevPath]: false,
      [currentPath]: true
    }))
  }
  useEffect(() => {
    // use substring to remove the "/"
    const currentPath = location.pathname.substring(1)
    setLinkStatesHandler(currentPath)
  }, [location])

  return (
    <div className={classes.container}>
      <div className={classes.leftSideContainer}>
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            CashEd
          </Typography>
          <Typography variant="h6" className={classes.title}>
            The Finance Tracker
          </Typography>
        </div>
        <img src={walletIcon} alt="logo" className={classes.logo}></img>
      </div>
      <Stack
        direction="row"
        spacing={3}
        divider={
          <Divider className={classes.navLinkDivider} orientation="vertical" />
        }
        justifyContent="center"
        alignItems="center"
        className={classes.rightSideContainer}
      >
        {!linkStates.home && (
          <NavLink className={classes.navLink} to="/home">
            Home
          </NavLink>
        )}
        {!linkStates.aboutUs && (
          <NavLink className={classes.navLink} to="/aboutUs">
            About Us
          </NavLink>
        )}
        {!linkStates.contact && (
          <NavLink className={classes.navLink} to="/contact">
            Contact
          </NavLink>
        )}
        {!linkStates.login && (
          <NavLink className={classes.navLink} to="/login">
            Login
          </NavLink>
        )}
        {!linkStates.register && (
          <NavLink className={classes.navLink} to="/register">
            Register
          </NavLink>
        )}
      </Stack>
    </div>
  )
}
export default LandingHeader
