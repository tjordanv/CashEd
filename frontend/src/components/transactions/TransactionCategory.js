import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import TransactionSubcategory from "./TransactionSubcategory"
import classes from "./TransactionCategory.module.css"
import { usdFormatter } from "../../utils/usdFormatter"
import fetcher from "../../utils/fetchAuthorize"
import FetchError from "../../utils/fetchError"
import TransactionImportAddCategory from "./TransactionImportAddCategory"

const TransactionCategory = ({
  category,
  activeSubcategoryId,
  setActiveSubcategory,
  transactions
}) => {
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[category.id - 1].filter((subcategory) => subcategory.active)
  )
  const setSubcategoriesHandler = (subcategories) => {
    setSubcategories((prevState) => [...prevState, ...subcategories])
  }

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

  const addCategory = async () => {
    const params = new URLSearchParams({
      categoryId: category.id
    })
    const response = await fetcher(
      `http://localhost:8080/getTransactionSubcategories?${params}`
    )
    if (!response.ok) {
      throw new FetchError.fromResponse(response)
    } else if (response.status === 200) {
      const responseJson = await response.json()
      console.log(responseJson)
    }
    console.log("add category")
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
      <TransactionImportAddCategory
        categoryId={category.id}
        setSubcategoriesHandler={setSubcategories}
      />
    </Card>
  )
}

export default TransactionCategory
