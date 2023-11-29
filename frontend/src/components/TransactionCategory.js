import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import data from "../data"
import { useLoaderData } from "react-router-dom"
import TransactionSubcategory from "./TransactionSubcategory"
import classes from "./TransactionCategory.module.css"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { usdFormatter } from "../utils/usdFormatter"

// This will ultimately be an async function to fetch the data from the DB
const TransactionSubcategoriesImportLoader = () => {
  const incomeSubcategories = data.subcategories[0]
  const saveAndInvestSubcategories = data.subcategories[1]
  const variableExpSubcategories = data.subcategories[2]
  const fixedExpSubcategories = data.subcategories[3]

  return [
    incomeSubcategories,
    saveAndInvestSubcategories,
    variableExpSubcategories,
    fixedExpSubcategories
  ]
}

export { TransactionSubcategoriesImportLoader }

const TransactionCategory = ({
  category,
  activeSubcategoryId,
  setActiveSubcategory,
  transactions
}) => {
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[category.id - 1]
  )

  const sumOfTransactions = (id) => {
    try {
      return transactions.reduce((sum, currentTransaction) => {
        return currentTransaction.subcategoryId === id
          ? sum + currentTransaction.amount
          : sum
      }, 0)
    } catch {
      return null
    }
  }

  const total =
    transactions !== null
      ? transactions.reduce((sum, currentTransaction) => {
          return sum + currentTransaction.amount
        }, 0)
      : 0.0

  const backgroundColor = () => {
    switch (category.id) {
      case 1:
        return "rgba(23, 195, 178, 0.45)"
      case 2:
        return "rgba(34, 124, 157, 0.65)"
      case 3:
        return "rgba(255, 203, 119, 0.55)"
      case 4:
        return "rgba(254, 109, 115, 0.6)"
      default:
        return "rgba(119, 119, 119, 0.15)"
    }
  }
  return (
    <Card
      className={classes.container}
      style={{
        "--backgroundColor": backgroundColor(),
        "--height": category.id < 3 ? "49%" : "100%"
      }}
    >
      <CardHeader
        className={classes.myCardHeader}
        titleTypographyProps={{
          fontSize: 18
        }}
        title={category.name}
        subheader={usdFormatter(total)}
      />
      <CardContent className={classes.cardContent}>
        <Stack spacing={2} className={classes.subcategoriesContainer}>
          {subcategories.map((subcategory) => {
            const total = sumOfTransactions(subcategory.id)
            return (
              <TransactionSubcategory
                subcategory={subcategory}
                isActive={subcategory.id === activeSubcategoryId}
                setActiveSubcategory={setActiveSubcategory}
                total={total}
                key={Math.floor(Math.random() * 99999)}
              />
            )
          })}
        </Stack>
      </CardContent>
      <IconButton aria-label="Import" className={classes.button}>
        <AddBoxIcon color="lightWhite" fontSize="large" />
      </IconButton>
    </Card>
  )
}

export default TransactionCategory
