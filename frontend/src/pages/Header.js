import HeaderLayout from "../components/Header/HeaderLayout"
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
