import classes from "./Home.module.css"
import Stack from "@mui/material/Stack"
import BarChartIcon from "@mui/icons-material/BarChart"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import CreditScoreIcon from "@mui/icons-material/CreditScore"
import Typography from "@mui/material/Typography"
import HomePieChart from "../components/HomePieChart"
import { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

const Home = () => {
  const [activeIndex, setActiveIndex] = useState("")

  /* The items are 1 index rather than zero index bc when the index is passed to the HomePieChart, 
  it is easier to identify when action should be taken in the useEffect hook */
  const stackItems = [
    {
      index: 1,
      icon: CreditScoreIcon,
      text: "Budgeting Made Easy",
      hoverColor: "#FFCB77"
    },
    {
      index: 2,
      icon: BarChartIcon,
      text: "Engaging and Intuitive Tools",
      hoverColor: "#FE6D73"
    },
    {
      index: 3,
      icon: EmojiEventsIcon,
      text: "Define and Achieve Your Success",
      hoverColor: "#17C3B2"
    },
    {
      index: 4,
      icon: CurrencyExchangeIcon,
      text: "Reclaim Your Income",
      hoverColor: "#227C9D"
    }
  ]

  const StackItem = ({ item }) => (
    <div
      className={classes.stackItem}
      onMouseEnter={() => setActiveIndex(item.index)}
    >
      <item.icon
        className={activeIndex === item.index ? classes.activeIcon : ""}
        style={{ "--hoverColor": item.hoverColor }}
      />
      <Typography
        variant="h5"
        className={activeIndex === item.index ? classes.activeText : ""}
        style={{ "--hoverColor": item.hoverColor }}
      >
        {item.text}
      </Typography>
    </div>
  )
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.titleContainer}>
          <Typography variant="h4">Get to know your money</Typography>
          <div></div>
          <div></div>
        </div>
        <Card className={classes.listContainer}>
          <CardContent>
            <Stack spacing={6}>
              {stackItems.map((item) => (
                <StackItem item={item} key={item.index} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </div>
      <HomePieChart index={activeIndex} setListIndex={setActiveIndex} />
    </div>
  )
}

export default Home
