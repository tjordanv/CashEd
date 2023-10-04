import classes from "./AboutUs.module.css"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"

import { useState } from "react"
import { useEffect } from "react"

const AboutUsSelector = () => {
  return (
    <Stack
      direction="row"
      spacing={10}
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      className={classes.stack}
    >
      <div className={classes.selector} onClick={() => selectorHandler(false)}>
        <Typography variant="h6" color="primary.text">
          Get to know your money.
        </Typography>
        {!isKnowCreator && (
          <>
            <div></div>
            <div></div>
          </>
        )}
      </div>
      <div className={classes.selector} onClick={() => selectorHandler(true)}>
        <Typography variant="h6" color="primary.text">
          Get to know the creator.
        </Typography>
        {isKnowCreator && (
          <>
            <div></div>
            <div></div>
          </>
        )}
      </div>
    </Stack>
  )
}

export default AboutUsSelector
