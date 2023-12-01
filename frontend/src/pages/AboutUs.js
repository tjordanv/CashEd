import { useState } from "react"
import AboutUsSelector from "../components/aboutUs/AboutUsSelector"
import BioCard from "../components/aboutUs/BioCard"
import AboutUsBio from "../components/aboutUs/AboutUsBio"
import classes from "./AboutUs.module.css"

const AboutUs = () => {
  const [isCreator, setIsCreator] = useState(false)

  const Content = () => {
    if (isCreator) {
      return <BioCard />
    } else {
      return <AboutUsBio />
    }
  }
  return (
    <div className={classes.container}>
      <AboutUsSelector isCreator={isCreator} setIsCreator={setIsCreator} />
      <Content />
    </div>
  )
}

export default AboutUs
