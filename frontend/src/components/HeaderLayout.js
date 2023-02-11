import { styled } from "@mui/material/styles"
import { NavLink } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Link from "@mui/material/Link"
import Divider from "@mui/material/Divider"

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
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={6}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <NavLink to="/" underline="hover">
          Dashboard
        </NavLink>
        <NavLink to="TransactionImport" underline="hover">
          Budget
        </NavLink>
        <NavLink href="#" underline="hover">
          Accounts
        </NavLink>
        <NavLink href="#" underline="hover">
          About Us
        </NavLink>
        <NavLink href="#" underline="hover">
          Contact Us
        </NavLink>
      </Stack>
    </HeaderContainer>
  )
}
export default Header
