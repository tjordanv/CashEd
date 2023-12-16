import React from "react";
import classes from "./AboutUsSelector.module.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import teamMembers from "./TeamData";

const AboutUsSelector = ({ isCreator, setIsCreator, onCreatorSelect }) => {
  return (
    <Stack
      direction="row"
      spacing={10}
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      className={classes.container}
    >
      <div className={classes.selector} onClick={() => setIsCreator(false)}>
        <Typography variant="h6" color="primary.text">
          Get to know your money
        </Typography>
        {!isCreator && <div></div>}
      </div>
      <div className={classes.selector} onClick={() => setIsCreator(true)}>
        <Typography variant="h6" color="primary.text">
          Get to know the creators
        </Typography>
        {isCreator && (
          <>
            <div></div>
            <div></div>
          </>
        )}
      </div>
      {isCreator && typeof onCreatorSelect === "function" && (
        <div className={classes.creatorList}>
          <Typography variant="h6" color="primary.text">
            Select a creator:
          </Typography>
          <ul>
            {teamMembers.map((creator, index) => (
              <li key={index} onClick={() => onCreatorSelect(index)}>
                {creator.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Stack>
  );
};

export default AboutUsSelector;
