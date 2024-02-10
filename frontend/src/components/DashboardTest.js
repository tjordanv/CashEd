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
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { ClassNames } from "@emotion/react"
import classes from "./DashboardTest.module.css"
import TransactionsList from "./transactions/TransactionsList"
import Transaction from "./transactions/Transaction"
import { ResponsivePie } from "@nivo/pie"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

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

const StyledListItemButton = styled(ListItemButton)(
  ({ theme, hoverColor, selectedColor }) => ({
    marginLeft: 25,
    "&:hover": {
      backgroundColor: hoverColor
    },
    "&.Mui-selected": {
      backgroundColor: selectedColor
    },
    "&.Mui-selected:hover": {
      backgroundColor: hoverColor
    }
  })
)

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
  let counter = 0
  const [incomeCategories, setIncomeCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 1) counter++
        return item.categoryId === 1
      })
      .map((item, index) => {
        const opacity = 1 - ((1 / counter) * index).toFixed(2)
        item.color = `rgba(23, 195, 178, ${opacity})`
        item.hoverColor = `rgba(23, 195, 178, ${opacity - 0.1})`
        return item
      })
  )
  counter = 0
  const [savingsAndInvestmentCategories, setSavingsAndInvestmentCategories] =
    useState(
      useLoaderData()
        .filter((item) => {
          if (item.categoryId === 2) counter += 1.5
          return item.categoryId === 2
        })
        .map((item, index) => {
          const opacity = 1 - ((1 / counter) * index).toFixed(2)
          item.color = `rgba(34, 124, 157, ${opacity})`
          item.hoverColor = `rgba(34, 124, 157, ${opacity - 0.1})`
          return item
        })
    )
  counter = 0
  const [variableExpCategories, setVariableExpCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 3) counter += 1.75
        return item.categoryId === 3
      })
      .map((item, index) => {
        const opacity = 1 - ((1 / counter) * index).toFixed(2)
        item.color = `rgba(255, 203, 119, ${opacity})`
        item.hoverColor = `rgba(255, 203, 119, ${opacity - 0.1})`
        return item
      })
  )
  counter = 0
  const [fixedExpCategories, setFixedExpCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 4) counter += 1.6
        return item.categoryId === 4
      })
      .map((item, index) => {
        const opacity = 1 - ((1 / counter) * index).toFixed(2)
        item.color = `rgba(254, 109, 115, ${opacity})`
        item.hoverColor = `rgba(254, 109, 115, ${opacity - 0.1})`
        return item
      })
  )
  const colors = [
    ...savingsAndInvestmentCategories,
    ...variableExpCategories,
    ...fixedExpCategories
  ].map((item) => item.color)

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
  const pieMouseLeaveHandler = () => {
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
  const listMouseLeaveHandler = () => {
    if (transactions.length === 0) setActiveId(null)
  }

  const listEvents = (item) => ({
    onClick: () => listClickHandler(item),
    onMouseEnter: listMouseEnterHandler,
    onMouseLeave: listMouseLeaveHandler,
    selected: item.id === activeId && transactions.length > 0
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
        <Box display="flex" alignItems="center">
          <Box
            width={16}
            height={16}
            bgcolor={"rgba(23, 195, 178, 1)"}
            marginRight={1}
            borderRadius="50%"
          />
          <Typography variant="h6" style={{ textDecoration: "underline" }}>
            Income
          </Typography>
        </Box>
        <List dense={true} className={classes.list}>
          {incomeCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              selectedColor={item.color}
              hoverColor={item.hoverColor}
            >
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </StyledListItemButton>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <Box
            width={16}
            height={16}
            bgcolor={"rgba(34, 124, 157, 1)"}
            marginRight={1}
            borderRadius="50%"
          />
          <Typography variant="h6" style={{ textDecoration: "underline" }}>
            Savings & Investment{" "}
          </Typography>
        </Box>
        <List dense={true} className={classes.list}>
          {savingsAndInvestmentCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              selectedColor={item.color}
              hoverColor={item.hoverColor}
            >
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </StyledListItemButton>
          ))}
        </List>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  "&.Mui-checked": {
                    color: "rgba(255, 203, 119, 1)"
                  }
                }}
              />
            }
            label={
              <Typography variant="h6" style={{ textDecoration: "underline" }}>
                Variable Expenditures
              </Typography>
            }
          />
        </FormGroup>
        <List dense={true} className={classes.list}>
          {variableExpCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              selectedColor={item.color}
              hoverColor={item.hoverColor}
            >
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </StyledListItemButton>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <Box
            width={16}
            height={16}
            bgcolor={"rgba(254, 109, 115, 1)"}
            marginRight={1}
            borderRadius="50%"
          />
          <Typography variant="h6" style={{ textDecoration: "underline" }}>
            Fixed Expenditures
          </Typography>
        </Box>
        <List dense={true} className={classes.list}>
          {fixedExpCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              selectedColor={item.color}
              hoverColor={item.hoverColor}
            >
              <ListItemText
                primary={item.label}
                // secondary={usdFormatter(item.value)}
              />
            </StyledListItemButton>
          ))}
        </List>
      </List>
      <Box
        className={classes.pieContainer}
        sx={{ width: "800px", height: "800px" }}
      >
        <ResponsivePie
          data={[
            ...savingsAndInvestmentCategories,
            ...variableExpCategories,
            ...fixedExpCategories
          ]}
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
          colors={colors}
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
