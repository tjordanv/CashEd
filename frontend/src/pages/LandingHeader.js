import LandingHeaderLayout from "../components/Header/LandingHeader"
import { Outlet } from "react-router-dom"
import classes from "./LandingHeader.module.css"

const LandingHeader = () => {
  return (
    <div className={classes.container}>
      <LandingHeaderLayout />
      <Outlet />
    </div>
  )
}

export default LandingHeader
