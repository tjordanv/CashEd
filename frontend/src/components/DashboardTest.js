import React, { useCallback, useEffect, useMemo, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import { PieChart } from "@mui/x-charts/PieChart"
import { useDrawingArea } from "@mui/x-charts/hooks"
import { Divider, MenuItem, Typography } from "@mui/material"
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

const StyledListItemButton = styled(ListItemButton)(({ theme, props }) => ({
  marginLeft: 25,
  borderRadius: 8,
  "&:hover": {
    backgroundColor: props.hoverColor
  },
  "&.Mui-selected": {
    backgroundColor: props.selectedColor
  },
  "&.Mui-selected:hover": {
    backgroundColor: props.hoverColor
  }
}))

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
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const DashboardTest = () => {
  const [activeId, setActiveId] = useState()
  const [highlightedCategory, setHighlightedCategory] = useState()
  const [transactions, setTransactions] = useState([])
  const [testData, setTestData] = useState(useLoaderData())
  const [incomeCategoriesSelected, setIncomeCategoriesSelected] =
    useState(false)
  const [
    savingsAndInvestmentCategoriesSelected,
    setSavingsAndInvestmentCategoriesSelected
  ] = useState(true)
  const [variableExpCategoriesSelected, setVariableExpCategoriesSelected] =
    useState(true)
  const [fixedExpCategoriesSelected, setFixedExpCategoriesSelected] =
    useState(true)
  let counter = 0
  let incomeTotal = 0
  const [incomeCategories, setIncomeCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 1) {
          counter += 1.4
          incomeTotal += item.value
        }
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
  let savingsAndInvestmentTotal = 0
  const [savingsAndInvestmentCategories, setSavingsAndInvestmentCategories] =
    useState(
      useLoaderData()
        .filter((item) => {
          if (item.categoryId === 2) {
            counter += 1.5
            savingsAndInvestmentTotal += item.value
          }
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
  let variableExpTotal = 0
  const [variableExpCategories, setVariableExpCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 3) {
          counter += 1.75
          variableExpTotal += item.value
        }
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
  let fixedExpTotal = 0
  const [fixedExpCategories, setFixedExpCategories] = useState(
    useLoaderData()
      .filter((item) => {
        if (item.categoryId === 4) {
          counter += 1.6
          fixedExpTotal += item.value
        }
        return item.categoryId === 4
      })
      .map((item, index) => {
        const opacity = 1 - ((1 / counter) * index).toFixed(2)
        item.color = `rgba(254, 109, 115, ${opacity})`
        item.hoverColor = `rgba(254, 109, 115, ${opacity - 0.1})`
        return item
      })
  )
  const data = () => {
    let result = []
    if (incomeCategoriesSelected && Array.isArray(incomeCategories))
      result = [...result, ...incomeCategories]
    if (
      savingsAndInvestmentCategoriesSelected &&
      Array.isArray(savingsAndInvestmentCategories)
    )
      result = [...result, ...savingsAndInvestmentCategories]
    if (variableExpCategoriesSelected && Array.isArray(variableExpCategories))
      result = [...result, ...variableExpCategories]
    if (fixedExpCategoriesSelected && Array.isArray(fixedExpCategories))
      result = [...result, ...fixedExpCategories]
    return result
  }
  const colors = data().map((item) => item.color)

  const currentMonth = monthNames[new Date().getMonth()]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveId(null)
        setTransactions([])
        setHighlightedCategory(null)
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
      setHighlightedCategory(null)
    } else {
      setHighlightedCategory({ name: node.label, amount: node.value })
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
      setHighlightedCategory(null)
    } else {
      setTransactions(node.transactions)
      setActiveId(node.id)
      setHighlightedCategory({ name: node.label, amount: node.value })
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
    <Box className={classes.container}>
      <List className={classes.subcategoryListParent}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={incomeCategoriesSelected}
                onChange={(e) => setIncomeCategoriesSelected(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "rgba(23, 195, 178, 1)"
                  }
                }}
              />
            }
            label={
              <>
                <Typography className={classes.reducedLineHeight} variant="h6">
                  Income
                </Typography>
                <Typography
                  className={classes.reducedLineHeight}
                  variant="subtitle1"
                >
                  {usdFormatter(incomeTotal)}
                </Typography>
              </>
            }
          />
          <Divider variant="middle" />
        </FormGroup>
        <List dense={true} className={classes.subcategoryList}>
          {incomeCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              props={{ selectedColor: item.color, hoverColor: item.hoverColor }}
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
                value={savingsAndInvestmentCategoriesSelected}
                onChange={(e) =>
                  setSavingsAndInvestmentCategoriesSelected(e.target.checked)
                }
                sx={{
                  "&.Mui-checked": {
                    color: "rgba(34, 124, 157, 1)"
                  }
                }}
              />
            }
            label={
              <>
                <Typography className={classes.reducedLineHeight} variant="h6">
                  Savings & Investment
                </Typography>
                <Typography
                  className={classes.reducedLineHeight}
                  variant="subtitle1"
                >
                  {usdFormatter(savingsAndInvestmentTotal)}
                </Typography>
              </>
            }
          />
          <Divider variant="middle" />
        </FormGroup>
        <List dense={true} className={classes.subcategoryList}>
          {savingsAndInvestmentCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              props={{ selectedColor: item.color, hoverColor: item.hoverColor }}
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
                value={variableExpCategoriesSelected}
                onChange={(e) =>
                  setVariableExpCategoriesSelected(e.target.checked)
                }
                sx={{
                  "&.Mui-checked": {
                    color: "rgba(255, 203, 119, 1)"
                  }
                }}
              />
            }
            label={
              <>
                <Typography className={classes.reducedLineHeight} variant="h6">
                  Variable Expenditures
                </Typography>
                <Typography
                  className={classes.reducedLineHeight}
                  variant="subtitle1"
                >
                  {usdFormatter(variableExpTotal)}
                </Typography>
              </>
            }
          />
          <Divider variant="middle" />
        </FormGroup>
        <List dense={true} className={classes.subcategoryList}>
          {variableExpCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              props={{ selectedColor: item.color, hoverColor: item.hoverColor }}
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
                value={fixedExpCategoriesSelected}
                onChange={(e) =>
                  setFixedExpCategoriesSelected(e.target.checked)
                }
                sx={{
                  "&.Mui-checked": {
                    color: "rgba(254, 109, 115, 1)"
                  }
                }}
              />
            }
            label={
              <>
                <Typography className={classes.reducedLineHeight} variant="h6">
                  Fixed Expenditures
                </Typography>
                <Typography
                  className={classes.reducedLineHeight}
                  variant="subtitle1"
                >
                  {usdFormatter(fixedExpTotal)}
                </Typography>
              </>
            }
          />
          <Divider variant="middle" />
        </FormGroup>
        <List dense={true} className={classes.subcategoryList}>
          {fixedExpCategories.map((item, index) => (
            <StyledListItemButton
              key={index}
              id={item.id}
              {...listEvents(item)}
              props={{ selectedColor: item.color, hoverColor: item.hoverColor }}
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
        sx={{
          position: "relative",
          width: "calc(100vw - 600px)",
          height: "calc(100vh - 105px)"
        }}
      >
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {currentMonth}
        </Typography>
        <ResponsivePie
          data={data()}
          innerRadius={0.65}
          activeId={activeId}
          padAngle={0.5}
          cornerRadius={2}
          activeInnerRadiusOffset={10}
          activeOuterRadiusOffset={16}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          onClick={pieClickHandler}
          onMouseEnter={pieMouseEnterHandler}
          onMouseLeave={pieMouseLeaveHandler}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          motionConfig="wobbly"
          tooltip={test}
          colors={colors}
        >
          {/* <Label>{highlightedAmount}</Label> */}
        </ResponsivePie>
        {highlightedCategory && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              padding: "5px"
            }}
          >
            <Typography variant="h6">{highlightedCategory.name}</Typography>
            <Typography variant="h5">
              {usdFormatter(highlightedCategory.amount)}
            </Typography>
          </div>
        )}
      </Box>
      <Box className={classes.detailsContainer}>
        {highlightedCategory && (
          <Box>
            <Typography
              className={classes.reducedLineHeight}
              variant="subtitle2"
            >
              Target Goal: $$$$$
            </Typography>
            <Typography
              className={classes.reducedLineHeight}
              variant="subtitle2"
            >
              Current Total: {usdFormatter(highlightedCategory.amount)}
            </Typography>
            <Typography
              className={classes.reducedLineHeight}
              variant="subtitle2"
            >
              Previous Month: $$$$$
            </Typography>
          </Box>
        )}
        <TransactionsList transactions={transactions} />
      </Box>
    </Box>
  )
}

export default DashboardTest
