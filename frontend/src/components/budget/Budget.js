import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import { PieChart } from "@mui/x-charts/PieChart"
import { useDrawingArea } from "@mui/x-charts/hooks"
import { MenuItem, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20
}))

function Label({ children }) {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  )
}

const PieCenterLabel = ({ children }) => {
  //const theme = useTheme();
  const { width, height, left, top } = useDrawingArea()

  return (
    <Typography
      component="text"
      sx={{
        //fill: theme.palette.text.primary,
        textAnchor: "middle",
        dominantBaseline: "central",
        fontSize: 20,
        position: "absolute",
        left: left + width / 2,
        top: top + height / 2
      }}
    >
      {children}
    </Typography>
  )
}

const DashboardTest = () => {
  const [highlightedAmount, setHighlightedAmount] = useState()
  const [transactionsView, setTransactionsView] = useState("monthly")
  const [currentView, setCurrentView] = useState()

  const changeViewHandler = (event) => {
    setTransactionsView(event.target.value)
  }

  const changeCurrentViewHandler = (event) => {
    setCurrentView(event.target.value)
  }

  const data1 = [
    { label: "Group A", value: 400 },
    { label: "Group B", value: 300 },
    { label: "Group C", value: 300 },
    { label: "Group D", value: 200 }
  ]

  const data2 = [
    { label: "A1", value: 100 },
    { label: "A2", value: 300 },
    { label: "B1", value: 100 },
    { label: "B2", value: 80 },
    { label: "B3", value: 40 },
    { label: "B4", value: 30 },
    { label: "B5", value: 50 },
    { label: "C1", value: 100 },
    { label: "C2", value: 200 },
    { label: "D1", value: 150 },
    { label: "D2", value: 50 }
  ]

  const pieClickHandler = (event, itemIdentifier, item) => {
    setHighlightedAmount(item.value)
  }

  return (
    <Box>
      <Select value={transactionsView} onChange={changeViewHandler}>
        <MenuItem value={"monthly"}>Monthly</MenuItem>
        <MenuItem value={"annual"}>Annual</MenuItem>
        <MenuItem value={"ytd"}>YTD</MenuItem>
      </Select>
      <Select
        disabled={transactionsView === "ytd"}
        value={currentView}
        onChange={changeCurrentViewHandler}
      ></Select>
      <PieChart
        series={[
          {
            innerRadius: 60,
            outerRadius: 90,
            data: data1,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 55, additionalRadius: -10, color: "gray" }
          }
          // {
          //   innerRadius: 105,
          //   outerRadius: 145,
          //   data: data2,
          //   highlightScope: { faded: "global", highlighted: "item" },
          //   faded: { innerRadius: 100, additionalRadius: -10, color: "gray" }
          // }
        ]}
        onClick={pieClickHandler}
        width={400}
        height={300}
        slotProps={{
          legend: { hidden: true }
        }}
      >
        <Label>{highlightedAmount}</Label>
      </PieChart>
    </Box>
  )
}

export default DashboardTest
