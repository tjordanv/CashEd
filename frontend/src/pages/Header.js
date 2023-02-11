import HeaderLayout from "../components/HeaderLayout"
import { Outlet } from "react-router-dom"

const Header = () => {
  return (
    <>
      <HeaderLayout />
      <Outlet />
    </>
  )
}

export default Header
