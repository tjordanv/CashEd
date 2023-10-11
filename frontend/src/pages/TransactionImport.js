import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import TransactionCategories from "../components/TransactionCategories"

const TransactionImport = () => {
  const [subcategories, selectSubcategories] = useState(
    useLoaderData().subcategories
  )

  return (
    <div>
      <TransactionCategories />
    </div>
  )
}

export default TransactionImport
