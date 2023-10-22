import { useState } from "react"
import TransactionCategories from "../components/TransactionCategories"
import Button from "@mui/material/Button"
import classes from "./TransactionImport.module.css"
import data from "../app/data"
import { DragDropContext } from "react-beautiful-dnd"
import TransactionsList from "../components/TransactionsList"
import AddTransactionContainer from "../components/AddTransactionForm/AddTransactionContainer"
import AddTransactionForm from "../components/AddTransactionForm/AddTransactionForm"

const TransactionImport = () => {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null)
  const [transactions, setTransactions] = useState(null)

  const importTransactions = () => {
    setTransactions(data.transactions)
  }

  const deleteTransactionHandler = (transactionId) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    )
    setTransactions(updatedTransactions)
  }

  const addSubcategory = (transactionIndex, subcategoryId, categoryId) => {
    const updatedTransactions = [...transactions]
    const transactionToUpdate = updatedTransactions[transactionIndex]
    if (transactionToUpdate) {
      transactionToUpdate.subcategoryId = subcategoryId
      transactionToUpdate.categoryId = categoryId
    }

    setTransactions(updatedTransactions)
  }

  const setActiveSubcategoryIdHandler = (id) => {
    if (id === activeSubcategoryId) {
      setActiveSubcategoryId(null)
    } else {
      setActiveSubcategoryId(id)
    }
  }

  const onDragEnd = (e) => {
    const { destination, source } = e

    // do nothing if dropped in same spot or into a non-droppable area
    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      !destination
    ) {
      return
    }

    // reorder if dropped into same list. Has no real productive use but could be fun for users
    else if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      const transaction = transactions[source.index]
      let tempTransactions = transactions
      tempTransactions.splice(source.index, 1)
      tempTransactions.splice(destination.index, 0, transaction)

      setTransactions(tempTransactions)
    } else {
      // add transaction to a subcategory
      const [destinationSubcategoryId, destinationCategoryId] =
        destination.droppableId.split(",").map(Number)

      console.log(source)
      addSubcategory(
        source.index,
        destinationSubcategoryId,
        destinationCategoryId
      )
    }
  }
  const test = () => {
    const [x, y] = "x,y".split(",")
    console.log(x + " it was split: " + y)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>
        <AddTransactionForm />
        {/* <AddTransactionContainer /> */}
        {/* <Button onClick={importTransactions}>import</Button>
        <Button onClick={() => console.log(transactions)}>log</Button> */}
        {transactions && (
          <TransactionsList
            transactions={transactions}
            droppableId="list"
            deleteTransactionHandler={deleteTransactionHandler}
          />
        )}

        <TransactionCategories
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategoryId={setActiveSubcategoryIdHandler}
          transactions={transactions}
        />
        {transactions && activeSubcategoryId && (
          <TransactionsList
            transactions={transactions}
            deleteTransactionHandler={deleteTransactionHandler}
            droppableId={activeSubcategoryId.toString()}
          />
        )}
      </div>
    </DragDropContext>
  )
}

export default TransactionImport
