import Box from "@mui/material/Box"
import authClasses from "./auth/Auth.module.css"
import classes from "./Home.module.css"
import footer from "../assets/AuthFooter.png"
import Stack from "@mui/material/Stack"
import BarChartIcon from "@mui/icons-material/BarChart"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CreditScoreIcon from "@mui/icons-material/CreditScore"
import Typography from "@mui/material/Typography"
import HomePieChart from "../components/HomePieChart"
import { useState } from "react"

const Home = () => {
  const [activeIndex, setActiveIndex] = useState("")

  /* The items are 1 index rather than zero index bc when the index is passed to the HomePieChart, 
  it is easier to identify when action should be taken in the useEffect hook */
  const stackItems = [
    {
      index: 1,
      icon: CreditScoreIcon,
      text: "Set and and and achieve budgets",
      hoverColor: "#FFCB77"
    },
    {
      index: 2,
      icon: BarChartIcon,
      text: "Set and achieve budgets",
      hoverColor: "#227C9D"
    },
    {
      index: 3,
      icon: CheckCircleIcon,
      text: "Set  achieve budgets",
      hoverColor: "#17C3B2"
    },
    {
      index: 4,
      icon: CurrencyExchangeIcon,
      text: "Set and  achieve budgets",
      hoverColor: "#FE6D73"
    }
  ]

  const StackItem = ({ item }) => (
    <div
      className={classes.stackItem}
      onMouseEnter={() => setActiveIndex(item.index)}
    >
      <item.icon style={{ "--hoverColor": item.hoverColor }} />
      <Typography variant="h5" style={{ "--hoverColor": item.hoverColor }}>
        {item.text}
      </Typography>
    </div>
  )
  return (
    <div className={authClasses.wrapper}>
      <div className={classes.cont}>
        <div className={classes.subCont}>
          <div className={classes.titleCont}>
            <Typography variant="h4">Get to know your money.</Typography>
            <div></div>
            <div></div>
          </div>
          <Box className={classes.tempCont}>
            <Stack spacing={6}>
              {stackItems.map((item) => (
                <StackItem item={item} key={item.index} />
              ))}
            </Stack>
          </Box>
        </div>
        <HomePieChart index={activeIndex} setListIndex={setActiveIndex} />
      </div>
      <img alt="footer" src={footer} className={authClasses.footer} />
    </div>
  )
}

export default Home
