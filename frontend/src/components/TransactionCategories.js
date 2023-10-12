import { Card, CardContent, CardHeader } from "@mui/material"
import data from "../app/data"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import TransactionSubcategory from "./TransactionSubcategory"
import classes from "./TransactionCategory.module.css"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

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
  subcategories,
  activeSubcategoryId,
  setActiveSubcategoryId,
  transactions
}) => {
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
      className={classes.transactionCategory}
      style={{
        "--backgroundColor": backgroundColor(),
        "--height": category.id < 3 ? "48%" : "100%"
      }}
    >
      <CardHeader title={category.name} subheader={total} />
      <CardContent className={classes.transactionCategoryContent}>
        <div className={classes.subcategoriesContainer}>
          {subcategories.map((subcategory) => {
            const total = sumOfTransactions(subcategory.id)
            return (
              <TransactionSubcategory
                subcategory={subcategory}
                isActive={subcategory.id === activeSubcategoryId}
                setActiveSubcategoryId={setActiveSubcategoryId}
                total={total}
                key={Math.floor(Math.random() * 99999)}
              />
            )
          })}
        </div>
        <IconButton
          aria-label="Import"
          // onClick={logs}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "0 auto"
          }}
        >
          <AddBoxIcon color="lightWhite" fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  )
}

const categories = [
  { name: "Income", id: 1 },
  { name: "Savings & Investments", id: 2 },
  { name: "Variable Expenditures", id: 3 },
  { name: "Fixed Expenditures", id: 4 }
]

const TransactionCategories = ({
  activeSubcategoryId,
  setActiveSubcategoryId,
  transactions
}) => {
  const [subcategories, setSubcategories] = useState(useLoaderData())

  // const filterTransactions = (id) => {
  //   try {
  //     return transactions.filter((transaction) => transaction.categoryId === id)
  //   } catch {
  //     return null
  //   }
  // }

  let filteredTransactions = [[], [], [], []]
  if (transactions)
    categories.forEach((category, index) => {
      filteredTransactions[index] = transactions.filter(
        (transaction) => transaction.categoryId === category.id
      )
    })

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <TransactionCategory
          category={categories[0]}
          subcategories={subcategories[0]}
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategoryId={setActiveSubcategoryId}
          transactions={filteredTransactions[0]}
          key={Math.floor(Math.random() * 99999)}
        />
        <TransactionCategory
          category={categories[1]}
          subcategories={subcategories[1]}
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategoryId={setActiveSubcategoryId}
          transactions={filteredTransactions[1]}
          key={Math.floor(Math.random() * 99999)}
        />
      </div>
      <TransactionCategory
        category={categories[2]}
        subcategories={subcategories[2]}
        activeSubcategoryId={activeSubcategoryId}
        setActiveSubcategoryId={setActiveSubcategoryId}
        transactions={filteredTransactions[2]}
        key={Math.floor(Math.random() * 99999)}
      />
      <TransactionCategory
        category={categories[3]}
        subcategories={subcategories[3]}
        activeSubcategoryId={activeSubcategoryId}
        setActiveSubcategoryId={setActiveSubcategoryId}
        transactions={filteredTransactions[3]}
        key={Math.floor(Math.random() * 99999)}
      />
    </div>
    // <div>
    //   {categories.map((category) => {
    //     const filteredTransactions = filterTransactions(category.id)
    //     return (
    //       <TransactionCategory
    //         category={category}
    //         subcategories={subcategories[category.id - 1]}
    //         activeSubcategoryId={activeSubcategoryId}
    //         setActiveSubcategoryId={setActiveSubcategoryId}
    //         transactions={filteredTransactions}
    //         key={Math.floor(Math.random() * 99999)}
    //       />
    //     )
    //   })}
    // </div>
  )
}

export default TransactionCategories
