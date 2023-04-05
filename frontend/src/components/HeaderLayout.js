import { styled } from "@mui/material/styles"
import { NavLink } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Link from "@mui/material/Link"
import Divider from "@mui/material/Divider"

import classes from "./HeaderLayout.module.css"

const HeaderContainer = styled(Box)(({ theme }) => ({
  height: "6vh",
  borderBottom: "2px solid rgba(119, 119, 119, 0.2)"
}))

const NavLinks = styled(Link)(({ theme }) => ({
  cursor: "pointer",
  color: "#454545",
  fontWeight: 350,
  fontSize: "16px"
}))

const Header = () => {
  return (
    <HeaderContainer>
      <Stack
        className={classes.list}
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={6}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="TransactionImport"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Transaction Import
        </NavLink>
        <NavLink
          to="nothing"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Budget
        </NavLink>
        <NavLink
          to="filler"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Accounts
        </NavLink>
        <NavLink
          to="more filler"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          About Us
        </NavLink>
        <NavLink
          to="last"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Contact Us
        </NavLink>
      </Stack>
    </HeaderContainer>
  )
}
export default Header
