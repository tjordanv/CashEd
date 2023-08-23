import LandingHeaderLayout from "../components/Header/LandingHeader"
import { Outlet } from "react-router-dom"

const LandingHeader = () => {
  return (
    <>
      <LandingHeaderLayout />
      <Outlet />
    </>
  )
}

export default LandingHeader
