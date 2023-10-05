import classes from "./BioCard.module.css"
import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
import tylerHeadshot from "../assets/TylerHeadshot.jpg"
import EmailIcon from "./EmailIcon"
import Typography from "@mui/material/Typography"
import { NavLink } from "react-router-dom"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import AboutUsWrapper from "./AboutUsWrapper"

const BioCard = () => {
  return (
    <AboutUsWrapper>
      <img className={classes.headshot} src={tylerHeadshot} alt="headshot" />
      <div className={classes.body}>
        <Typography variant="h3" className={classes.title} color="primary.text">
          Tyler Vicari
        </Typography>
        <Typography variant="h5" color="primary.text">
          Software Engineer
        </Typography>
        <br></br>
        <Typography variant="body2" color="primary.text">
          In early 2020, my fascination with software development was ignited.
          Little did I know that this initial spark would lead me down a
          captivating path of discovery. As I delved deeper into the subject, I
          found myself immersed in a vast realm of possibilities that had
          previously been hidden from view.
        </Typography>
        <br></br>
        <Typography variant="body2" color="primary.text">
          This newfound passion for software development fundamentally
          transformed my perspective on technology and its role in our lives.
          The process of conceptualizing and meticulously crafting applications
          became a source of daily delight and engagement for me.
        </Typography>
      </div>
      <Box className={classes.linksContainer}>
        <Stack spacing={4}>
          <NavLink
            to="https://www.linkedin.com/in/tyler-vicari/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin" />
          </NavLink>
          <NavLink
            to="https://github.com/tjordanv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" />
          </NavLink>
          <EmailIcon />
        </Stack>
      </Box>
    </AboutUsWrapper>
  )
}

export default BioCard
