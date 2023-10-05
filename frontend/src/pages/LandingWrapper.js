import { Outlet } from "react-router-dom"
import footer from "../assets/AuthFooter.png"
import classes from "./LandingWrapper.module.css"
import LandingHeader from "../components/Header/LandingHeader"
const LandingWrapper = () => {
  return (
    <div className={classes.wrapper}>
      <LandingHeader />
      <Outlet />
      <img alt="footer" src={footer} className={classes.footer} />
    </div>
  )
}

export default LandingWrapper
