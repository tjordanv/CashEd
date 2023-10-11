import { Card, CardContent, CardHeader } from "@mui/material"
import data from "../app/data"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"

// This will ultimately be an async function to fetch the data from the DB
const TransactionImportLoader = () => {
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

export { TransactionImportLoader }

const TransactionCategory = ({ category, subcategories }) => {
  return (
    <Card>
      <CardHeader title={category.name} />
      <CardContent>
        {subcategories.map((subcategory) => (
          <p>{subcategory.name}</p>
        ))}
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

const TransactionCategories = () => {
  const [subcategories, setSubcategories] = useState(useLoaderData())
  console.log(subcategories)
  return (
    <div>
      {categories.map((category) => (
        <TransactionCategory
          category={category}
          subcategories={subcategories[category.id - 1]}
        />
      ))}
    </div>
  )
}

export default TransactionCategories
