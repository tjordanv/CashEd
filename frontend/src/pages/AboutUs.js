import React, { useState } from "react";
import AboutUsSelector from "../components/AboutUsSelector";
import BioCard from "../components/BioCard";
import AboutUsBio from "../components/AboutUsBio";
import classes from "./AboutUs.module.css";
import teamMembers from "../components/TeamData"; // Update the path accordingly

const AboutUs = () => {
  const [isCreator, setIsCreator] = useState(false);

  return (
    <div className={classes.container}>
      <AboutUsSelector
        isCreator={isCreator}
        setIsCreator={setIsCreator}
      />
      {isCreator ? (
        teamMembers.map((member, index) => (
          <BioCard key={index} member={member} />
        ))
      ) : (
        <AboutUsBio />
      )}
    </div>
  );
};

export default AboutUs;
