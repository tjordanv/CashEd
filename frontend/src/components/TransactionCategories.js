import classes from "./TransactionCategories.module.css"
import TransactionCategory from "./TransactionCategory"

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
