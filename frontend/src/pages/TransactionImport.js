import { useState } from "react"
import TransactionCategories from "../components/TransactionCategories"
import Button from "@mui/material/Button"

import data from "../app/data"
import Transaction from "../components/Transaction"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import TransactionsList from "../components/TransactionsList"

const TransactionImport = () => {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null)
  const [transactions, setTransactions] = useState(null)

  const importTransactions = () => {
    setTransactions(data.transactions)
  }

  const addSubcategory = (transactionId, subcategoryId, categoryId) => {
    const updatedTransactions = [...transactions]
    const transactionToUpdate = updatedTransactions.find(
      (transaction) => transaction.id === transactionId
    )
    if (transactionToUpdate) {
      transactionToUpdate.subcategoryId = subcategoryId
      transactionToUpdate.categoryId = categoryId
    }

    setTransactions(updatedTransactions)
  }

  const onDragEnd = (e) => {
    const { destination, source } = e

    console.log("destination dropId: " + destination.droppableId)
    console.log("source dropId: " + source.droppableId)
    console.log("destination index: " + destination.index)
    console.log("source index: " + source.index)

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
      <div>
        <Button onClick={importTransactions}>import</Button>
        <Button onClick={() => console.log(transactions)}>log</Button>
        {transactions && (
          <TransactionsList transactions={transactions} droppableId="list" />
        )}
        <TransactionCategories
          activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategoryId={setActiveSubcategoryId}
          transactions={transactions}
        />
        {transactions && activeSubcategoryId && (
          <TransactionsList
            transactions={transactions}
            droppableId={activeSubcategoryId.toString()}
          />
        )}
      </div>
    </DragDropContext>
  )
}

export default TransactionImport
