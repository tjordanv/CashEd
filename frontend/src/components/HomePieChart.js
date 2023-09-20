import { PieChart, Pie, Cell, Sector } from "recharts"
import classes from "./HomePieChart.module.css"
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"

// The pie chart data for each slice. Values are all set to 1 so each slice is equal size.
const data = [
  {
    value: 1,
    text: "Design a straightforward budget in minutes. Take control of your money."
  },
  {
    value: 1,
    text: "CashEd's analysis engine provides a deeper understanding of financial health and tendencies, enabling you to make more intentional decisions about your money."
  },
  {
    value: 1,
    text: "CashEd helps you set clear goals and objectives and then track your progress towards them."
  },
  {
    value: 1,
    text: "CashEd boasts a suite of interactive tools and technologies that simplify your journey to financial freedom."
  }
]

// The colors for the pie chart slices.
const COLORS = ["#FFCB77", "#227C9D", "#17C3B2", "#FE6D73"]

// This is the outer line that displays over the active slice in the pie chart
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

/*
  index: represents the currently active index of the home page list and the pie chart.
    It gets passed as a prop to update the pie chart when the active index is update in 
    the home page list.
  setListIndex: the handler that updates the home page list's active index when the pie 
    chart's active index is updated.   
*/
const HomePieChart = ({ index, setListIndex }) => {
  const [text, setText] = useState("")
  const [activeIndex, setActiveIndex] = useState("")

  /* Recharts Pie chart is indexed counter clockwise. To make the hover animation go 
  clockwise, we have to adjust the index incoming from the list accordingly */
  const listToPie = { 1: 0, 2: 3, 3: 2, 4: 1 }
  const pieToList = { 0: 1, 2: 3, 3: 2, 1: 4 }
  useEffect(() => {
    const adjustedIndex = listToPie[index]

    if (adjustedIndex || adjustedIndex === 0) {
      setText(data[adjustedIndex].text)
      setActiveIndex(adjustedIndex)
    }
  }, [index])

  // Update the text displayed and the active index for both the pie chart and the home page list
  const onPieEnter = (body, pieIndex) => {
    setActiveIndex(pieIndex)
    setText(body.text)
    setListIndex(pieToList[pieIndex])
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
        <Typography color="primary.text" variant="body1">
          {text}
        </Typography>
      </div>
    </div>
  )
}

export default HomePieChart
