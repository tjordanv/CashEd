import React, { useCallback, useEffect, useMemo, useState } from "react"
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
import { ResponsivePie } from "@nivo/pie"

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
  const [activeId, setActiveId] = useState()
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveId(null)
        setTransactions([])
        setHighlightedAmount(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const pieClickHandler = (node) => {
    if (node.id === activeId && transactions.length > 0) {
      setActiveId(null)
      setTransactions([])
      setHighlightedAmount(null)
    } else {
      setHighlightedAmount(node.value)
      setTransactions(node.data.transactions)
      setActiveId(node.id)
    }
  }
  const pieMouseEnterHandler = (node) => {
    if (!activeId) setActiveId(node.id)
  }
  const pieMouseLeaveHandler = (node) => {
    if (activeId && transactions.length === 0) setActiveId(null)
  }
  const listClickHandler = (node) => {
    if (node.id === activeId && transactions.length > 0) {
      setActiveId(null)
      setTransactions([])
      setHighlightedAmount(null)
    } else {
      setTransactions(node.transactions)
      setActiveId(node.id)
      setHighlightedAmount(node.value)
    }
  }

  const listMouseEnterHandler = (e) => {
    if (transactions.length === 0) setActiveId(parseInt(e.target.id))
  }
  const listMouseLeaveHandler = (e) => {
    if (transactions.length === 0) setActiveId(null)
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

  const listEvents = (item) => ({
    onClick: () => listClickHandler(item),
    onMouseEnter: listMouseEnterHandler,
    onMouseLeave: listMouseLeaveHandler
  })

  const test = ({ datum }) => {
    return (
      <Box>
        <Typography variant="h6">{datum.label}</Typography>
        <Typography variant="h6">{usdFormatter(datum.value)}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex" }}>
      <List dense={true}>
        <Typography variant="h6">Income</Typography>
        <List dense={true} className={classes.list}>
          {incomeCategories.map((item, index) => (
            <ListItem key={index} id={item.id} {...listEvents(item)}>
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
            <ListItem key={index} id={item.id} {...listEvents(item)}>
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
            <ListItem key={index} id={item.id} {...listEvents(item)}>
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
            <ListItem key={index} id={item.id} {...listEvents(item)}>
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <Box
        className={classes.pieContainer}
        sx={{ width: "800px", height: "800px" }}
      >
        <ResponsivePie
          data={testData}
          innerRadius={0.5}
          activeId={activeId}
          padAngle={0.5}
          cornerRadius={2}
          activeInnerRadiusOffset={6}
          activeOuterRadiusOffset={12}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          onClick={pieClickHandler}
          onMouseEnter={pieMouseEnterHandler}
          onMouseLeave={pieMouseLeaveHandler}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          motionConfig="wobbly"
          tooltip={test}
        ></ResponsivePie>
      </Box>
      <List>
        {transactions.map((item, index) => (
          <Transaction transaction={item} canDelete={false} key={item.id} />
        ))}
      </List>
    </Box>
  )
}

export default DashboardTest
