import classes from "./AboutUs.module.css"
import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
import email from "../assets/email.svg"
import tylerHeadshot from "../assets/TylerHeadshot.jpg"
import aboutUsParagraphFrame from "../assets/aboutUsFrame.png"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"

import { useState } from "react"

const AboutUs = () => {
  const [isAlert, setIsAlert] = useState(false)
  const [isKnowCreator, setIsKnowCreator] = useState(false)

  const paragraphLines = [
    `A phrase that embodies the mission of Finance App. With endless information at our fingertips, too often 
  do the important things get lost or forgotten. Your money should not be one of those things.`,

    `Simply having information is not always enough; more importantly is what we do with that information.`,

    `Finance App provides the tools necessary to successfully
  control your personal finances. As you set budgets and goals, your performance can be easily tracked in real time. Your spending
  and deposits are automatically brought into an easy to use drag and drop system that allows you to quickly get your hands on
  each transaction and categorize them appropriately. A deep understanding of your spending habits and overall financial health 
  will be gained through the use of simple, yet powerful, tools such as spending forecast calculators, beautiful charts, and more.`,

    `Know your money, own your money.`
  ]

  const selectorHandler = (isKnowCreator) => {
    setIsKnowCreator(isKnowCreator)
  }

  return (
    <Card className={classes.bioCard}>
      <CardContent className={classes.cardContents}>
        <Stack
          direction="row"
          spacing={10}
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          className={classes.stack}
        >
          <div
            className={classes.selector}
            onClick={() => selectorHandler(false)}
          >
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
          <div
            className={classes.selector}
            onClick={() => selectorHandler(true)}
          >
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
      </CardContent>
    </Card>
  )
}

export default AboutUs
