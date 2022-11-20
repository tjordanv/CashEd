import { styled } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Link from "@mui/material/Link"
import Divider from "@mui/material/Divider"
import { red } from "@mui/material/colors"

const Header = () => {
  const NavLink = styled(Link)(({ theme }) => ({
    cursor: "pointer",
    color: "#454545",
    fontWeight: 350,
    fontSize: "16px"
  }))

  const HeaderContainer = styled(Box)(({ theme }) => ({
    height: "70px"
  }))

  return (
    <HeaderContainer>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={6}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <NavLink href="#" underline="hover">
          Dashboard
        </NavLink>
        <NavLink href="#" underline="hover">
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
