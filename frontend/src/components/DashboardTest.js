import React, { useCallback, useEffect, useMemo, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import {
  Divider,
  IconButton,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material"
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
import { ResponsiveBar } from "@nivo/bar"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Collapse from "@mui/material/Collapse"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const testLoader = async () => {
  const date = new Date()
  const currentMonthParams = new URLSearchParams({
    month: date.getMonth() + 1,
    year: date.getFullYear()
  })
  try {
    const currentMonthResponse = await fetcher(
      `http://localhost:8080/getTest2?${currentMonthParams}`
    )

    if (!currentMonthResponse.ok) {
      throw new Error("Network response was not ok")
    }
    let currentMonthData = await currentMonthResponse.json()
    const prevMonthParams = new URLSearchParams({
      month: date.getMonth() === 0 ? 12 : date.getMonth(),
      year: date.getMonth === 0 ? date.getFullYear() - 1 : date.getFullYear()
    })

    const previousMonthResponse = await fetcher(
      `http://localhost:8080/getTest2?${prevMonthParams}`
    )

    if (!previousMonthResponse.ok) {
      throw new Error("Network response was not ok")
    }
    let previousMonthData = await previousMonthResponse.json()

    currentMonthData.map((item) => {
      item.value = parseInt(item.total)
      item.label = item.name

      const prevItem = previousMonthData.find(
        (prevItem) => prevItem.id === item.id
      )
      item.previousTotal = prevItem ? prevItem.total : 0

      return item
    })

    return currentMonthData
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
  const [incomeCategoriesExpanded, setIncomeCategoriesExpanded] =
    useState(false)
  const [
    savingsAndInvestmentCategoriesExpanded,
    setSavingsAndInvestmentCategoriesExpanded
  ] = useState(false)
  const [variableExpCategoriesExpanded, setVariableExpCategoriesExpanded] =
    useState(false)
  const [fixedExpCategoriesExpanded, setFixedExpCategoriesExpanded] =
    useState(false)
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
        item.barColor = "rgba(23, 195, 178, 1)"
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
          item.barColor = "rgba(34, 124, 157, 1)"
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
        item.barColor = "rgba(255, 203, 119, 1)"
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
        item.barColor = "rgba(254, 109, 115, 1)"
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

  // classes used for styling the card when expanded
  const expandClasses = (isExpanded) =>
    `${classes["expandMore"]} ${
      isExpanded ? classes["expandMoreExpanded"] : ""
    }`

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveId(null)
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
    if (node.id === activeId && highlightedCategory) {
      setActiveId(null)
      setHighlightedCategory(null)
    } else {
      setHighlightedCategory({
        name: node.label,
        total: node.value,
        previousTotal: node.data.previousTotal,
        colors: node.data.barColor
      })
      setActiveId(node.id)
    }
  }
  const pieMouseEnterHandler = (node) => {
    if (!activeId) setActiveId(node.id)
  }
  const pieMouseLeaveHandler = () => {
    if (activeId && !highlightedCategory) setActiveId(null)
  }
  const listClickHandler = (node) => {
    if (node.id === activeId && highlightedCategory) {
      setActiveId(null)
      setHighlightedCategory(null)
    } else {
      setActiveId(node.id)
      setHighlightedCategory({
        name: node.label,
        total: node.value,
        previousTotal: node.previousTotal,
        colors: node.barColor
      })
    }
  }

  const listMouseEnterHandler = (e) => {
    if (!highlightedCategory) setActiveId(parseInt(e.target.id))
  }
  const listMouseLeaveHandler = () => {
    if (!highlightedCategory) setActiveId(null)
  }

  const listEvents = (item) => ({
    onClick: () => listClickHandler(item),
    onMouseEnter: listMouseEnterHandler,
    onMouseLeave: listMouseLeaveHandler,
    selected: item.id === activeId && highlightedCategory !== null
  })

  const test = ({ datum }) => {
    return (
      <Box>
        <Typography variant="h6">{datum.label}</Typography>
        <Typography variant="h6">{usdFormatter(datum.value)}</Typography>
      </Box>
    )
  }
  const test2 = ({ id, value, indexValue }) => {
    return (
      <Box>
        <Typography variant="h6">{indexValue}</Typography>
        <Typography variant="h6">{usdFormatter(value)}</Typography>
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <List className={classes.subcategoryListParent}>
        <FormGroup className={classes.subcategory}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={incomeCategoriesSelected}
                  onChange={(e) => {
                    setIncomeCategoriesSelected(e.target.checked)
                    setIncomeCategoriesExpanded(e.target.checked)
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(23, 195, 178, 1)"
                    }
                  }}
                />
              }
              label={
                <>
                  <Typography
                    className={classes.reducedLineHeight}
                    variant="h6"
                  >
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
            <IconButton
              className={expandClasses(incomeCategoriesExpanded)}
              aria-expanded={incomeCategoriesExpanded}
              aria-label="show more"
              onClick={() => {
                setIncomeCategoriesExpanded(!incomeCategoriesExpanded)
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Divider variant="middle" />
        </FormGroup>
        <Collapse in={incomeCategoriesExpanded} timeout="auto" unmountOnExit>
          <List dense={true} className={classes.subcategoryList}>
            {incomeCategories.map((item, index) => (
              <Tooltip
                arrow
                placement="right"
                key={index}
                title={
                  <Typography variant="subtitle1">
                    {usdFormatter(item.total)}
                  </Typography>
                }
              >
                <StyledListItemButton
                  key={index}
                  id={item.id}
                  {...listEvents(item)}
                  props={{
                    selectedColor: item.color,
                    hoverColor: item.hoverColor
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    // secondary={usdFormatter(item.value)}
                  />
                </StyledListItemButton>
              </Tooltip>
            ))}
          </List>
        </Collapse>
        <Box sx={{ height: "25px" }} />
        <FormGroup className={classes.subcategory}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value={savingsAndInvestmentCategoriesSelected}
                  onChange={(e) => {
                    setSavingsAndInvestmentCategoriesSelected(e.target.checked)
                    setSavingsAndInvestmentCategoriesExpanded(e.target.checked)
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(34, 124, 157, 1)"
                    }
                  }}
                />
              }
              label={
                <>
                  <Typography
                    className={classes.reducedLineHeight}
                    variant="h6"
                  >
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
            <IconButton
              className={expandClasses(savingsAndInvestmentCategoriesExpanded)}
              aria-expanded={savingsAndInvestmentCategoriesExpanded}
              aria-label="show more"
              onClick={() => {
                setSavingsAndInvestmentCategoriesExpanded(
                  !savingsAndInvestmentCategoriesExpanded
                )
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Divider variant="middle" />
        </FormGroup>
        <Collapse
          in={savingsAndInvestmentCategoriesExpanded}
          timeout="auto"
          unmountOnExit
        >
          <List dense={true} className={classes.subcategoryList}>
            {savingsAndInvestmentCategories.map((item, index) => (
              <Tooltip
                arrow
                placement="right"
                key={index}
                title={
                  <Typography variant="subtitle1">
                    {usdFormatter(item.total)}
                  </Typography>
                }
              >
                <StyledListItemButton
                  key={index}
                  id={item.id}
                  {...listEvents(item)}
                  props={{
                    selectedColor: item.color,
                    hoverColor: item.hoverColor
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    // secondary={usdFormatter(item.value)}
                  />
                </StyledListItemButton>
              </Tooltip>
            ))}
          </List>
        </Collapse>
        <Box sx={{ height: "25px" }} />
        <FormGroup className={classes.subcategory}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={variableExpCategoriesSelected}
                  onChange={(e) => {
                    setVariableExpCategoriesSelected(e.target.checked)
                    setVariableExpCategoriesExpanded(e.target.checked)
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(255, 203, 119, 1)"
                    }
                  }}
                />
              }
              label={
                <>
                  <Typography
                    className={classes.reducedLineHeight}
                    variant="h6"
                  >
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
            <IconButton
              className={expandClasses(variableExpCategoriesExpanded)}
              aria-expanded={variableExpCategoriesExpanded}
              aria-label="show more"
              onClick={() => {
                setVariableExpCategoriesExpanded(!variableExpCategoriesExpanded)
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Divider variant="middle" />
        </FormGroup>
        <Collapse
          in={variableExpCategoriesExpanded}
          timeout="auto"
          unmountOnExit
        >
          <List dense={true} className={classes.subcategoryList}>
            {variableExpCategories.map((item, index) => (
              <Tooltip
                arrow
                placement="right"
                key={index}
                title={
                  <Typography variant="subtitle1">
                    {usdFormatter(item.total)}
                  </Typography>
                }
              >
                <StyledListItemButton
                  key={index}
                  id={item.id}
                  {...listEvents(item)}
                  props={{
                    selectedColor: item.color,
                    hoverColor: item.hoverColor
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    // secondary={usdFormatter(item.value)}
                  />
                </StyledListItemButton>
              </Tooltip>
            ))}
          </List>
        </Collapse>
        <Box sx={{ height: "25px" }} />
        <FormGroup className={classes.subcategory}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value={fixedExpCategoriesSelected}
                  onChange={(e) => {
                    setFixedExpCategoriesSelected(e.target.checked)
                    setFixedExpCategoriesExpanded(e.target.checked)
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(254, 109, 115, 1)"
                    }
                  }}
                />
              }
              label={
                <>
                  <Typography
                    className={classes.reducedLineHeight}
                    variant="h6"
                  >
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
            <IconButton
              className={expandClasses(fixedExpCategoriesExpanded)}
              aria-expanded={fixedExpCategoriesExpanded}
              aria-label="show more"
              onClick={() => {
                setFixedExpCategoriesExpanded(!fixedExpCategoriesExpanded)
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Divider variant="middle" />
        </FormGroup>
        <Collapse in={fixedExpCategoriesExpanded} timeout="auto" unmountOnExit>
          <List dense={true} className={classes.subcategoryList}>
            {fixedExpCategories.map((item, index) => (
              <Tooltip
                arrow
                placement="right"
                key={index}
                title={
                  <Typography variant="subtitle1">
                    {usdFormatter(item.total)}
                  </Typography>
                }
              >
                <StyledListItemButton
                  key={index}
                  id={item.id}
                  {...listEvents(item)}
                  props={{
                    selectedColor: item.color,
                    hoverColor: item.hoverColor
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    // secondary={usdFormatter(item.value)}
                  />
                </StyledListItemButton>
              </Tooltip>
            ))}
          </List>
        </Collapse>
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
        />
        {/* {highlightedCategory && (
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
              {usdFormatter(highlightedCategory.total)}
            </Typography>
          </div>
        )} */}
      </Box>
      <Box className={classes.detailsContainer}>
        {highlightedCategory && (
          <Box>
            <Typography variant="h5">{highlightedCategory.name}</Typography>
            {/* <Typography variant="h5">
              {usdFormatter(highlightedCategory.total)}
            </Typography> */}
            <Box sx={{ height: "600px", width: "200px" }}>
              <ResponsiveBar
                data={[
                  {
                    label: "Current Total",
                    amount: highlightedCategory.total
                  },
                  {
                    label: "Previous Month",
                    amount: highlightedCategory.previousTotal
                  },
                  {
                    label: "Goal Total",
                    amount: highlightedCategory.total + 100
                  }
                ]}
                keys={["amount"]}
                indexBy="label"
                colors={highlightedCategory.colors}
                colorBy="indexValue"
                margin={{ top: 20, right: 10, bottom: 120, left: 0 }}
                padding={0.3}
                tooltip={test2}
                enableLabel={false}
                enableGridY={false}
                axisBottom={null}
                legends={[
                  {
                    dataFrom: "indexes",
                    anchor: "bottom-left",
                    direction: "column",
                    justify: false,
                    translateX: 15,
                    translateY: 75,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemsSpacing: 2,
                    symbolSize: 20,
                    itemDirection: "left-to-right"
                  }
                ]}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "#eed312",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: (bar) => bar.indexValue === "Previous Month",
                    id: "dots"
                  }
                  // {
                  //   match: {
                  //     id: "amoun"
                  //   },
                  //   id: "lines"
                  // }
                ]}
              />
            </Box>
            {/* <span className={classes.detailText}>
              <Typography className={classes.reducedLineHeight} variant="h6">
                Target Goal:
              </Typography>
              <Typography className={classes.reducedLineHeight} variant="h6">
                $$$$$
              </Typography>
            </span>
            <span className={classes.detailText}>
              <Typography className={classes.reducedLineHeight} variant="h6">
                Current Total:
              </Typography>
              <Typography className={classes.reducedLineHeight} variant="h6">
                {usdFormatter(highlightedCategory.total)}
              </Typography>
            </span>
            <span className={classes.detailText}>
              <Typography className={classes.reducedLineHeight} variant="h6">
                Previous Month:
              </Typography>
              <Typography className={classes.reducedLineHeight} variant="h6">
                {usdFormatter(highlightedCategory.previousTotal)}
              </Typography>
            </span> */}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DashboardTest
