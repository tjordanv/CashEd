import { useState, useEffect } from "react"
import TransactionCategories from "../components/transactions/TransactionCategories"
import Button from "@mui/material/Button"
import classes from "./TransactionImport.module.css"
import { DragDropContext } from "react-beautiful-dnd"
import TransactionsList from "../components/transactions/TransactionsList"
import AddTransactions from "../components/transactions/AddTransactions"
import { Box, Typography, Divider } from "@mui/material"
import SaveTransactionsButton from "../uiComponents/SaveTransactionsButton"

const TransactionImport = () => {
  const [activeSubcategory, setActiveSubcategory] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [unassignedTransactions, setUnassignedTransactions] = useState([])
  const [activeTransactions, setActiveTransactions] = useState([])

  const deleteTransactionHandler = (transaction) => {
    if (transaction.subcategoryId === (null || undefined || 0)) {
      const updatedTransactions = unassignedTransactions.filter(
        (trans) => trans.transactionId !== transaction.transactionId
      )
      setUnassignedTransactions(updatedTransactions)
    } else {
      const updatedTransactions = transactions.filter(
        (trans) => trans.transactionId !== transaction.transactionId
      )
      setTransactions(updatedTransactions)
    }
  }

  const addSubcategory = ({
    transactionIndex,
    subcategoryId,
    categoryId,
    isUnassigned,
    destinationIndex
  }) => {
    const updatedTransactions = isUnassigned
      ? [...unassignedTransactions]
      : [...transactions]
    const transactionToUpdate = updatedTransactions[transactionIndex]
    if (transactionToUpdate) {
      transactionToUpdate.subcategoryId = subcategoryId
      transactionToUpdate.categoryId = categoryId
    }

    if (isUnassigned) {
      setTransactions((prevState) => [...prevState, transactionToUpdate])
      setUnassignedTransactions((prevState) =>
        prevState.filter(
          (transaction) =>
            transaction.transactionId !== transactionToUpdate.transactionId
        )
      )
    } else if (!subcategoryId) {
      let tempTransactions = unassignedTransactions
      tempTransactions.splice(destinationIndex, 0, transactionToUpdate)
      setUnassignedTransactions(tempTransactions)
      setTransactions((prevState) =>
        prevState.filter(
          (transaction) =>
            transaction.transactionId !== transactionToUpdate.transactionId
        )
      )
    } else {
      setTransactions(updatedTransactions)
    }
  }

  const setActiveSubcategoryHandler = (subcategory) => {
    if (activeSubcategory === null) {
      setActiveSubcategory(subcategory)
    } else if (subcategory.id === activeSubcategory.id) {
      setActiveSubcategory(null)
    } else {
      setActiveSubcategory(subcategory)
    }
  }

  const onDragEnd = (e) => {
    const { destination, source } = e
    const isUnassigned = source.droppableId === "unassigned"

    // do nothing if dropped in same spot or into a non-droppable area
    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      !destination
    ) {
      return
    }

    // reorder if dropped into same list.
    else if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      let tempTransactions = isUnassigned
        ? unassignedTransactions
        : activeTransactions
      const transaction = tempTransactions[source.index]
      tempTransactions.splice(source.index, 1)
      tempTransactions.splice(destination.index, 0, transaction)

      isUnassigned
        ? setUnassignedTransactions(tempTransactions)
        : setActiveTransactions(tempTransactions)
    }
    // remove transaction subcategory
    else if (destination.droppableId === "unassigned") {
      addSubcategory({
        transactionIndex: source.index,
        destinationIndex: destination.index
      })
    }
    // add or change transaction subcategory
    else {
      const [destinationSubcategoryId, destinationCategoryId] =
        destination.droppableId.split(",").map(Number)

      addSubcategory({
        transactionIndex: source.index,
        subcategoryId: destinationSubcategoryId,
        categoryId: destinationCategoryId,
        isUnassigned: isUnassigned
      })
    }
  }
  const test = () => {
    const [x, y] = "x,y".split(",")
    console.log(x + " it was split: " + y)
  }

  useEffect(() => {
    if (activeSubcategory === null && activeTransactions.length > 0) {
      setActiveTransactions([])
    }
    if (transactions && activeSubcategory) {
      setActiveTransactions(
        transactions.filter(
          (transaction) => transaction.subcategoryId === activeSubcategory.id
        )
      )
    }
  }, [activeSubcategory, transactions])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>
        <Box className={classes.newTransactionsContainer}>
          <Button
            onClick={() => console.log(transactions, unassignedTransactions)}
          >
            log
          </Button>
          <Typography variant="h6">New Transactions</Typography>
          <Divider
            sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
          />
          {(unassignedTransactions && (
            <TransactionsList
              transactions={unassignedTransactions}
              droppableId="unassigned"
              deleteTransactionHandler={deleteTransactionHandler}
            />
          )) || <Box sx={{ height: "70vh" }}></Box>}
          {unassignedTransactions.length > 0 && (
            <Divider
              sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
            />
          )}
          <AddTransactions
            addTransaction={setTransactions}
            addUnassignedTransactions={setUnassignedTransactions}
            isTransactions={unassignedTransactions.length > 0}
          />
          {unassignedTransactions.length === 0 && (
            <Divider
              sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
            />
          )}
        </Box>
        <Box className={classes.leftDivider}></Box>
        <Box>
          <TransactionCategories
            activeSubcategoryId={
              activeSubcategory ? activeSubcategory.id : null
            }
            setActiveSubcategory={setActiveSubcategoryHandler}
            transactions={transactions}
          />
        </Box>
        <Box className={classes.leftDivider}></Box>
        <Box className={classes.newTransactionsContainer}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {activeSubcategory ? activeSubcategory.name : "Click a category"}
          </Typography>
          <Divider
            sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
          />
          {(activeSubcategory && (
            <TransactionsList
              transactions={activeTransactions}
              deleteTransactionHandler={deleteTransactionHandler}
              droppableId={activeSubcategory.id.toString()}
            />
          )) || <Box sx={{ height: "70vh" }}></Box>}
          {activeSubcategory && (
            <Divider
              sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
            />
          )}
          <SaveTransactionsButton isActiveSubcategory={activeSubcategory} />

          {!activeSubcategory && (
            <Divider
              sx={{ width: "90%", borderColor: "rgba(119, 119, 119, 0.5)" }}
            />
          )}
        </Box>
      </div>
    </DragDropContext>
  )
}

export default TransactionImport
