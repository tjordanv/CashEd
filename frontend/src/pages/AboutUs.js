import React, { useState } from "react";
import AboutUsSelector from "../components/AboutUsSelector";
import BioCard from "../components/BioCard";
import AboutUsBio from "../components/AboutUsBio";
import classes from "./AboutUs.module.css";
import teamMembers from "../components/TeamData"; // Update the path accordingly

const AboutUs = () => {
  const [isCreator, setIsCreator] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const handleCreatorSelect = (index) => {
    const selectedCreator = teamMembers[index];
    setSelectedCreator(selectedCreator);
  };

  return (
    <div className={classes.container}>
      <AboutUsSelector
        isCreator={isCreator}
        setIsCreator={setIsCreator}
        onCreatorSelect={handleCreatorSelect}
      />
      {isCreator ? (
        selectedCreator ? (
          <BioCard member={selectedCreator} />
        ) : (
          <AboutUsBio />
        )
      ) : (
        <AboutUsBio />
      )}
    </div>
  );
};

export default AboutUs;
