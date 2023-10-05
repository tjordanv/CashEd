import { useState } from "react"
import AboutUsSelector from "../components/AboutUsSelector"
import BioCard from "../components/BioCard"
import AboutUsBio from "../components/AboutUsBio"
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
