import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import { PieChart } from "@mui/x-charts/PieChart"
import { useDrawingArea } from "@mui/x-charts/hooks"
import { MenuItem, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import { usdFormatter } from "../utils/usdFormatter"
import { useLoaderData } from "react-router-dom"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { ClassNames } from "@emotion/react"
import classes from "./DashboardTest.module.css"
import TransactionsList from "./transactions/TransactionsList"
import Transaction from "./transactions/Transaction"

const testLoader = async () => {
  try {
    const response = await fetcher("http://localhost:8080/getTest")

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    let data = await response.json()
    data.map((item) => {
      item.value = parseInt(item.total)
      item.label = item.name

      return item
    })

    return data
  } catch (error) {
    console.error("Error fetching data: ", error)
    return []
  }
}

export { testLoader }

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
  const [transactions, setTransactions] = useState([])
  const [testData, setTestData] = useState(useLoaderData())
  const [incomeCategories, setIncomeCategories] = useState(
    useLoaderData().filter((item) => item.categoryId === 1)
  )
  const [savingsAndInvestmentCategories, setSavingsAndInvestmentCategories] =
    useState(useLoaderData().filter((item) => item.categoryId === 2))
  const [variableExpCategories, setVariableExpCategories] = useState(
    useLoaderData().filter((item) => item.categoryId === 3)
  )
  const [fixedExpCategories, setFixedExpCategories] = useState(
    useLoaderData().filter((item) => item.categoryId === 4)
  )

  const data1 = [
    { label: "Group A", value: 400 },
    { label: "Group B", value: 300 },
    { label: "Group C", value: 300 },
    { label: "Group D", value: 200 }
  ]
  console.log(testData)

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
    console.log("event")
    setHighlightedAmount(item.value)
    setTransactions(item.transactions)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <List dense={true}>
        <Typography variant="h6">Income</Typography>
        <List dense={true} className={classes.list}>
          {incomeCategories.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Savings & Investment </Typography>
        <List dense={true} className={classes.list}>
          {savingsAndInvestmentCategories.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Variable Expenditures</Typography>
        <List dense={true} className={classes.list}>
          {variableExpCategories.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Fixed Expenditures</Typography>
        <List dense={true} className={classes.list}>
          {fixedExpCategories.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <PieChart
        series={[
          {
            innerRadius: 120,
            outerRadius: 170,
            data: [
              ...savingsAndInvestmentCategories,
              ...variableExpCategories,
              ...fixedExpCategories
            ],
            highlightScope: {
              faded: "global",
              highlighted: "item"
            },
            faded: { innerRadius: 125, additionalRadius: -10, color: "gray" }
          }
          // {
          //   innerRadius: 105,
          //   outerRadius: 145,
          //   data: data2,
          //   highlightScope: { faded: "global", highlighted: "item" },
          //   faded: { innerRadius: 100, additionalRadius: -10, color: "gray" }
          // }
        ]}
        onMouseEnter={pieClickHandler}
        onClick={pieClickHandler}
        width={800}
        height={800}
        slotProps={{
          legend: { hidden: true }
        }}
      >
        <Label>{highlightedAmount}</Label>
      </PieChart>
      <List>
        {transactions.map((item, index) => (
          <Transaction transaction={item} />
        ))}
      </List>
    </Box>
  )
}

export default DashboardTest
