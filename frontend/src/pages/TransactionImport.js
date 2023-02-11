import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DragDropContext } from "react-beautiful-dnd"

import { Divider, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Container, Stack } from "@mui/system"

import TransactionsList from "../components/TransactionsList"
import TransactionCategories from "../components/TransactionCategory/TransactionCategories"
import AddTransactionContainer from "../components/AddTransactionForm/AddTransactionContainer"

import { reorderTransactions, addSubcategory } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"

const TransactionImportsContainer = styled(Container)(({ theme }) => ({
  minHeight: "93.5vh",
  width: "300px",
  minWidth: "150px",
  margin: 0,
  padding: 0
}))

const TransactionImport = () => {
  const dispatch = useDispatch()

  const subcategories = useSelector((state) => state.subcategories.value)
  const transactions = useSelector((state) => state.transactions.value)
  const selectedSubcategory = useSelector((state) => {
    //this is wrapped in a try bc there are no subcategories when the page is first loaded in. I am
    // sure there is a way (a hook) to simply run this once the initial render is finished
    try {
      return state.subcategories.value.filter(
        (subcategory) => subcategory.isSelected
      )
    } catch (e) {
      return false
    }
  })

  const onDragEnd = (e) => {
    const { destination, source } = e
    if (!destination) {
      return
    }

    // do nothing if dropped in same spot
    else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // reorder if dropped into same list. Has no real productive use but could be fun for users
    else if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      dispatch(
        reorderTransactions({
          sourceIndex: source.index,
          destinationIndex: destination.index
        })
      )
    }

    // move transaction to another list or subcategory
    else {
      // when these actions are created, basically the entire page must rerender since
      // transaction and subcategory states are both being impacted
      const destinationSubcategory = subcategories.filter(
        (subcategory) => subcategory.Name === destination.droppableId
      )
      const sourceSubcategoryID = transactions[source.index].subcategoryID

      // logic for moving transaction from category out to import list
      if (destinationSubcategory.length === 0) {
        transactions.forEach((transaction, index) => {
          if (transaction.Description === e.draggableId) {
            dispatch(
              addSubcategory({
                transactionIndex: index,
                subcategoryID: null,
                categoryID: null
              })
            )
            dispatch(
              reorderTransactions({
                sourceIndex: index,
                destinationIndex: destination.index
              })
            )
          }
        })
      } else {
        // add transaction to a subcategory
        dispatch(
          addSubcategory({
            transactionIndex: source.index,
            subcategoryID: destinationSubcategory[0].ID,
            categoryID: destinationSubcategory[0].categoryID
          })
        )
        dispatch(
          updateSubcategoryTotal({
            subcategoryID: destinationSubcategory[0].ID,
            amount: transactions[source.index].Amount
          })
        )
      }
      // reduce source subcategory total when moving transaction to another location
      if (source.droppableId === "subcategoryTransactionsList") {
        subcategories.forEach((subcategory) => {
          if (subcategory.ID === sourceSubcategoryID) {
            dispatch(
              updateSubcategoryTotal({
                subcategoryID: sourceSubcategoryID,
                amount: -transactions[source.index].Amount
              })
            )
          }
        })
      }
    }
  }

  async function grabData() {
    const response = await fetch("http://localhost:8080/goal-scores/1")
    const data = await response.json()

    console.log(data)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack direction="row" spacing={0}>
        <TransactionImportsContainer>
          <Typography
            sx={{
              textAlign: "center",
              color: "#454545",
              fontStyle: "italic",
              marginTop: "20px"
            }}
          >
            Imported Transactions
          </Typography>
          <Divider />
          <TransactionsList droppableID={"importedTransactionsList"} />
          <Divider />
          <AddTransactionContainer />
        </TransactionImportsContainer>
        <Container
          sx={{
            margin: 0,
            width: "60vw",
            borderLeft: "2px solid rgba(119, 119, 119, 0.2)",
            borderRight: "2px solid rgba(119, 119, 119, 0.2)"
          }}
        >
          <TransactionCategories />
        </Container>

        {selectedSubcategory.length > 0 && (
          <TransactionImportsContainer>
            <Typography
              sx={{
                textAlign: "center",
                color: "#451115",
                fontStyle: "italic",
                marginTop: "20px"
              }}
            >
              {selectedSubcategory[0].Name}
            </Typography>
            <Typography>{selectedSubcategory[0].Total}</Typography>
            <TransactionsList
              droppableID={"subcategoryTransactionsList"}
              subcategoryID={selectedSubcategory[0].ID}
            />
          </TransactionImportsContainer>
        )}
      </Stack>
      {/* <Button onClick={grabData}>press</Button> */}
    </DragDropContext>
  )
}

export default TransactionImport
