import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetchAuthorize"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { usdFormatter } from "../utils/usdFormatter"
import { useLoaderData } from "react-router-dom"
import List from "@mui/material/List"
import classes from "./DashboardTest.module.css"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"
import SubcategoryList from "./SubcategoryList"

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
        item.barColor = "#17C3B2"
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
          item.barColor = "#227C9D"
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
        item.barColor = "#FFCB77"
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
        item.barColor = "#FE6D73"
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
        <SubcategoryList
          isSelected={incomeCategoriesSelected}
          setIsSelected={setIncomeCategoriesSelected}
          isExpanded={incomeCategoriesExpanded}
          setIsExpanded={setIncomeCategoriesExpanded}
          categoryTotal={incomeTotal}
          category="income"
          subcategories={incomeCategories}
          events={listEvents}
        />
        <SubcategoryList
          isSelected={savingsAndInvestmentCategoriesSelected}
          setIsSelected={setSavingsAndInvestmentCategoriesSelected}
          isExpanded={savingsAndInvestmentCategoriesExpanded}
          setIsExpanded={setSavingsAndInvestmentCategoriesExpanded}
          categoryTotal={savingsAndInvestmentTotal}
          category="savings"
          subcategories={savingsAndInvestmentCategories}
          events={listEvents}
        />
        <SubcategoryList
          isSelected={variableExpCategoriesSelected}
          setIsSelected={setVariableExpCategoriesSelected}
          isExpanded={variableExpCategoriesExpanded}
          setIsExpanded={setVariableExpCategoriesExpanded}
          categoryTotal={variableExpTotal}
          category="variable"
          subcategories={variableExpCategories}
          events={listEvents}
        />
        <SubcategoryList
          isSelected={fixedExpCategoriesSelected}
          setIsSelected={setFixedExpCategoriesSelected}
          isExpanded={fixedExpCategoriesExpanded}
          setIsExpanded={setFixedExpCategoriesExpanded}
          categoryTotal={fixedExpTotal}
          category="fixed"
          subcategories={fixedExpCategories}
          events={listEvents}
        />
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
      </Box>
      <Box className={classes.detailsContainer}>
        {highlightedCategory && (
          <Box>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {highlightedCategory.name}
            </Typography>
            {/* <Typography variant="h5">
              {usdFormatter(highlightedCategory.total)}
            </Typography> */}
            <Box sx={{ height: "calc(100vh - 175px)", width: "300px" }}>
              <ResponsiveBar
                data={[
                  {
                    label: "Current Total",
                    amount: highlightedCategory.total
                  },
                  {
                    label: "Previous Month",
                    previousAmount: highlightedCategory.previousTotal
                  },
                  {
                    label: "Goal Total",
                    goalAmount: highlightedCategory.total + 100
                  }
                ]}
                keys={["amount", "previousAmount", "goalAmount"]}
                indexBy="label"
                colors={highlightedCategory.colors}
                colorBy="indexValue"
                margin={{ top: 20, right: 0, bottom: 70, left: 0 }}
                padding={0.3}
                tooltip={test2}
                enableLabel={false}
                enableGridY={false}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 10,
                  tickRotation: 25,
                  legendPosition: "middle",
                  truncateTickAt: 0
                }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#fff7e7",
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#fff7e7",
                    rotation: -45,
                    lineWidth: 4,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: "previousAmount"
                    },
                    id: "dots"
                  },
                  {
                    match: {
                      id: "goalAmount"
                    },
                    id: "lines"
                  }
                ]}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DashboardTest
