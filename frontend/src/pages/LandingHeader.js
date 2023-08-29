import LandingHeaderLayout from "../components/Header/LandingHeader"
import { Outlet } from "react-router-dom"

const LandingHeader = () => {
  return (
    <>
      <LandingHeaderLayout />
      <Outlet />
      <div
        style={{ height: "50px", width: "100%", backgroundColor: "#fe6d73" }}
      ></div>
    </>
  )
}

export default LandingHeader
