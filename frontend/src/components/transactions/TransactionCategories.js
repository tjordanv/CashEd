import classes from "./TransactionCategories.module.css"
import TransactionCategory from "./TransactionCategory"
import fetcher from "../../utils/fetchAuthorize"
import FetchError from "../../utils/fetchError"

// This will ultimately be an async function to fetch the data from the DB
const TransactionSubcategoriesImportLoader = async () => {
  let subcategories = [[], [], [], []]
  try {
    const subcategoriesResponse = await fetcher(
      "http://localhost:8080/getActiveSubcategoriesByUser"
    )
    if (!subcategoriesResponse.ok) {
      throw new FetchError.fromResponse(subcategoriesResponse)
    } else if (subcategoriesResponse.status === 200) {
      const subcategoriesJson = await subcategoriesResponse.json()
      subcategoriesJson.forEach((category) => {
        subcategories[category.categoryId - 1].push(category)
      })
      return subcategories
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export { TransactionSubcategoriesImportLoader }

const categories = [
  { name: "Income", id: 1 },
  { name: "Savings & Investments", id: 2 },
  { name: "Variable Expenditures", id: 3 },
  { name: "Fixed Expenditures", id: 4 }
]

const TransactionCategories = ({
  activeSubcategoryId,
  setActiveSubcategory,
  transactions
}) => {
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
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategory={setActiveSubcategory}
          transactions={filteredTransactions[0]}
        />
        <TransactionCategory
          category={categories[1]}
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategory={setActiveSubcategory}
          transactions={filteredTransactions[1]}
        />
      </div>
      <TransactionCategory
        category={categories[2]}
        activeSubcategoryId={activeSubcategoryId}
        setActiveSubcategory={setActiveSubcategory}
        transactions={filteredTransactions[2]}
      />
      <TransactionCategory
        category={categories[3]}
        activeSubcategoryId={activeSubcategoryId}
        setActiveSubcategory={setActiveSubcategory}
        transactions={filteredTransactions[3]}
      />
    </div>
  )
}

export default TransactionCategories
