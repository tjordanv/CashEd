import AboutUsLayout from "../components/AboutUs"
import authClasses from "./auth/Auth.module.css"
import classes from "./AboutUs.module.css"
import footer from "../assets/AuthFooter.png"

const AboutUs = () => {
  return (
    <div className={authClasses.wrapper}>
      <AboutUsLayout />
      <img alt="footer" src={footer} className={authClasses.footer} />
    </div>
  )
}

export default AboutUs
