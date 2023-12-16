// BioCard.js
import React from "react";
import classes from "./BioCard.module.css";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import EmailIcon from "./EmailIcon";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AboutUsWrapper from "./AboutUsWrapper";


const BioCard = ({ member }) => {
  const { name, role, about, linkedinUrl, githubUrl, emailAddress, headshot} = member;

  return (
    <AboutUsWrapper>
      <img className={classes.headshot} src={headshot} alt="headshot" />
      <div className={classes.body}>
        <Typography variant="h3" className={classes.title} color="primary.text">
          {name}
        </Typography>
        <Typography variant="h5" color="primary.text">
          {role}
        </Typography>
        <br></br>
        {about.map((paragraph, index) => (
          <Typography key={index} variant="body2" color="primary.text">
            {paragraph}
          </Typography>
        ))}
      </div>
      <Box className={classes.linksContainer}>
        <Stack spacing={4}>
          <NavLink to={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="linkedin" />
          </NavLink>
          <NavLink to={githubUrl} target="_blank" rel="noopener noreferrer">
            <img src={github} alt="github" />
          </NavLink>
          <EmailIcon emailAddress={emailAddress} />
        </Stack>
      </Box>
    </AboutUsWrapper>
  );
};

export default BioCard;
