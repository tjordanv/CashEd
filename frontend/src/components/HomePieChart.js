import { PieChart, Pie, Cell } from "recharts"
import classes from "./HomePieChart.module.css"
import { useState } from "react"
import { Typography } from "@mui/material"

const data = [
  { value: 1, info: "some information to display about the application" },
  {
    value: 1,
    info: "this is also just text that will be displayed when you hover on this section of the pie chart"
  },
  {
    value: 1,
    info: "this will be some good good stuff about the application and how it helps its users"
  },
  {
    value: 1,
    info: "one final tidbit of information to display on the home page when the user hovers over the pie chart sections boi"
  }
]
const COLORS = ["#17C3B2", "#227C9D", "#FFCB77", "#FE6D73"]

const HomePieChart = () => {
  const [info, setInfo] = useState("")
  const test = (item) => {
    setInfo(item)
    console.log(item)
  }
  return (
    <div className={classes.container}>
      <PieChart width={300} height={350} className={classes.pie}>
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={100}
          outerRadius={140}
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
              stroke="none"
              onMouseEnter={() => test(entry.info)}
              onMouseLeave={() => setInfo("")}
            />
          ))}
        </Pie>
      </PieChart>
      <div
        className={`${classes.infoContainer} ${
          info ? "" : classes.infoContainerPlaceholder
        }`}
      >
        <Typography>{info}</Typography>
      </div>
    </div>
  )
}

export default HomePieChart
