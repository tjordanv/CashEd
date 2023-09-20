import { PieChart, Pie, Cell, Sector } from "recharts"
import classes from "./HomePieChart.module.css"
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"

const data = [
  { value: 1, text: "some information to display about the application" },
  {
    value: 1,
    text: "this is also just text that will be displayed when you hover on this section of the pie chart"
  },
  {
    value: 1,
    text: "this will be some good good stuff about the application and how it helps its users"
  },
  {
    value: 1,
    text: "one final tidbit of information to display on the home page when the user hovers over the pie chart sections boi"
  }
]
const COLORS = ["#FFCB77", "#227C9D", "#17C3B2", "#FE6D73"]
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload
  } = props

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  )
}

const HomePieChart = ({ index, setListIndex }) => {
  const [text, setText] = useState("")
  const [activeIndex, setActiveIndex] = useState("")

  /* Recharts Pie chart is indexed counter clockwise. To make the hover animation go 
  clockwise, we have to adjust the index incoming from the list accordingly */
  useEffect(() => {
    if (index === 1) {
      setText(data[0].text)
      setActiveIndex(0)
    } else if (index === 2) {
      setText(data[3].text)
      setActiveIndex(3)
    } else if (index === 3) {
      setText(data[2].text)
      setActiveIndex(2)
    } else if (index === 4) {
      setText(data[1].text)
      setActiveIndex(1)
    }
  }, [index])

  const onPieEnter = (body, index) => {
    setActiveIndex(index)
    setText(body.text)
    setListIndex(index + 1)
  }

  return (
    <div className={classes.container}>
      <PieChart width={350} height={350} className={classes.pie}>
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={100}
          outerRadius={140}
          paddingAngle={1}
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
          ))}
        </Pie>
      </PieChart>
      <div
        className={`${classes.infoContainer} ${
          text ? "" : classes.infoContainerPlaceholder
        }`}
      >
        <Typography>{text}</Typography>
      </div>
    </div>
  )
}

export default HomePieChart
