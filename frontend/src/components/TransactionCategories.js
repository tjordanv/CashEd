import { Card, CardContent, CardHeader } from "@mui/material"
import data from "../app/data"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import TransactionSubcategory from "./TransactionSubcategory"

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

  return (
    <Card>
      <CardHeader title={category.name} subheader={total} />
      <CardContent>
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
  transactions,
  deleteTransactionHandler
}) => {
  const [subcategories, setSubcategories] = useState(useLoaderData())

  const filterTransactions = (id) => {
    try {
      return transactions.filter((transaction) => transaction.categoryId === id)
    } catch {
      return null
    }
  }

  return (
    <div>
      {categories.map((category) => {
        const filteredTransactions = filterTransactions(category.id)
        return (
          <TransactionCategory
            category={category}
            subcategories={subcategories[category.id - 1]}
            activeSubcategoryId={activeSubcategoryId}
            setActiveSubcategoryId={setActiveSubcategoryId}
            transactions={filteredTransactions}
            key={Math.floor(Math.random() * 99999)}
          />
        )
      })}
    </div>
  )
}

export default TransactionCategories
