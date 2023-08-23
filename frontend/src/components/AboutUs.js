import classes from "./AboutUs.module.css"
import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
import email from "../assets/email.svg"
import tylerHeadshot from "../assets/TylerHeadshot.jpg"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { NavLink } from "react-router-dom"
import Alert from "@mui/material/Alert"

import copy from "clipboard-copy"
import { useState } from "react"
import { useEffect } from "react"

const AboutUs = () => {
  const [isAlert, setIsAlert] = useState(false)

  const copyToClipboard = async (textToCopy) => {
    try {
      await copy(textToCopy) // Copy text to clipboard
      setIsAlert(true)
    } catch (error) {
      console.error("Error copying text:", error)
    }
  }

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        // This code will execute after 3 seconds
        setIsAlert(false)
      }, 3000)
    }
  }, [isAlert])

  return (
    <div className={classes.container}>
      <Card className={classes.bioCard}>
        <CardContent className={classes.cardContent}>
          <div className={classes.rowContainer}>
            <div className={`${classes.backgroundBar} ${classes.top}`}>
              <NavLink
                to="https://www.linkedin.com/in/tyler-vicari/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.imageWrapper}
              >
                <img src={linkedin} alt="linkedin" className={classes.image} />
              </NavLink>
            </div>
            <div className={classes.overlay}>
              <Typography variant="h3" className={classes.name}>
                Tyler Vicari
              </Typography>
              <Typography variant="h5">
                Creator - Full Stack Software Engineer
              </Typography>
            </div>
          </div>
          <div className={classes.rowContainer}>
            <div className={`${classes.backgroundBar} ${classes.middle}`}>
              <NavLink
                className={classes.imageWrapper}
                to="https://github.com/tjordanv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="github" className={classes.image} />
              </NavLink>
            </div>
            <div className={`${classes.backgroundBar} ${classes.bottom}`}>
              <img
                title="TylerVicari@gmail.com"
                src={email}
                alt="email"
                className={classes.emailImage}
                onClick={() => copyToClipboard("tylervicari@gmail.com")}
              />
              {isAlert && (
                <Alert severity="info" className={classes.emailAlert}>
                  Email address copied to clipboard.
                </Alert>
              )}
            </div>
            <div className={`${classes.overlay} ${classes.largeOverlay}`}>
              <Typography variant="body2" className={classes.overlayText}>
                In early 2020, my fascination with software development was
                ignited. Little did I know that this initial spark would lead me
                down a captivating path of discovery. As I delved deeper into
                the subject, I found myself immersed in a vast realm of
                possibilities that had previously been hidden from view.
              </Typography>
              <Typography variant="body2" className={classes.overlayText}>
                This newfound passion for software development fundamentally
                transformed my perspective on technology and its role in our
                lives. The process of conceptualizing and meticulously crafting
                applications became a source of daily delight and engagement for
                me. What was once a mere curiosity has blossomed into a
                fulfilling routine, where I eagerly anticipate the challenges
                and rewards that each day's design work brings.
              </Typography>
            </div>
          </div>
          <img
            className={classes.headshot}
            src={tylerHeadshot}
            alt="headshot"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutUs
