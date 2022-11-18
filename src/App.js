import data from "./app/data"
import "./styles.css"

import { useDispatch, useSelector } from "react-redux"

import { DragDropContext } from "react-beautiful-dnd"

import { IconButton } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Grid } from "@mui/material"

import TransactionsList from "./components/transactionsList"
import TransactionCategories from "./components/transactionCategories"

import {
  importTransactions,
  reorderTransactions,
  addSubcategory
} from "./state/transactionsSlice"
import { updateSubcategoryTotal } from "./state/subcategoriesSlice"
import { Stack } from "@mui/system"

const dataSet = data

const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2"
    },
    lightWhite: {
      main: "rgba(255, 255, 255, 0.9)"
    }
  }
})

export default function App() {
  const dispatch = useDispatch()

  const subcategories = useSelector((state) => state.subcategories.value)
  const transactions = useSelector((state) => state.transactions.value)
  const selectedSubcategoryID = useSelector((state) => state.selectedSubcategoryID.value)
  const imports = (transactions) => {
    dispatch(importTransactions(dataSet.transactions))
  }

  const onDragEnd = (e) => {
    const { destination, source } = e
    //console.log(e);
    if (!destination) {
      //console.log("dropped in a no drop zone");
      return
    }

    // do nothing if dropped in same spot
    else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //console.log("dropped in place");
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
      // console.log("reordered", source.index, destination.index)
    }

    // move transaction to another list or subcategory
    else {
      // when these actions are created, basically the entire page must rerender since
      // transaction and subcategory states are both being impacted
      const destinationSubcategory = subcategories.filter(
        (subcategory) => subcategory.name === destination.droppableId
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
      return
    }
  }

  return (
    // I am going to need to figure out how to position things. Grid may or may not be the best option, unfortunately, it's reactivity could break
    // design that I am going for.
    <DragDropContext onDragEnd={onDragEnd}>
      <ThemeProvider theme={theme}>
        <Stack direction="row">
          <h1>header</h1>
          <div>
            <TransactionsList droppableID={"importedTransactionsList"} />
            <IconButton aria-label="Import" onClick={imports}>
              <AddBoxIcon color="primary" fontSize="large" />
            </IconButton>
          </div>
          <TransactionCategories />

          <TransactionsList
            droppableID={"subcategoryTransactionsList"}
            subcategoryID={selectedSubcategoryID}
          />
        </Stack>
        {/* <Grid justifyContent={"center"} container spacing={1}>
          <Grid className={"maingrid"} xs={12}>
            header
          </Grid>
          <Grid className={"maingrid"} xs={2}>
            <TransactionsList droppableID={"importedTransactionsList"} />
            <IconButton aria-label="Import" onClick={imports}>
              <AddBoxIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid className={"maingrid"} xs={6}>
            <TransactionCategories />
          </Grid>
          <Grid className={"maingrid"} xs={3}>
            <TransactionsList
              droppableID={"subcategoryTransactionsList"}
              subcategoryID={selectedSubcategoryID}
            />
          </Grid>
        </Grid> */}
      </ThemeProvider>
    </DragDropContext>
  )
}
