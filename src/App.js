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
import { updateSubCategoryTotal } from "./state/subcategoriesSlice"

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

  const subCategories = useSelector((state) => state.subCategories)
  const transactions = useSelector((state) => state.transactions)
  const selectedSubCategoryID = useSelector((state) => state.selectedSubCategoryID)

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
      dispatch(reorderTransactions(source.index, destination.index))
      // console.log("reordered")
    }

    // move transaction to another list or subcategory
    else {
      // when these actions are created, basically the entire page must rerender since
      // transaction and subcategory states are both being impacted
      const destinationSubcategory = subCategories.filter(
        (subCategory) => subCategory.name === destination.droppableId
      )
      const sourceSubCategoryID = transactions[source.index].subCategoryID

      // logic for moving transaction from category out to import list
      if (destinationSubcategory.length === 0) {
        transactions.forEach((transaction, index) => {
          if (transaction.Description === e.draggableId) {
            dispatch(addSubcategory(index, null, null))
            dispatch(reorderTransactions(index, destination.index))
          }
        })
      } else {
        // add transaction to a subcategory
        dispatch(
          addSubcategory(
            source.index,
            destinationSubcategory[0].ID,
            destinationSubcategory[0].categoryID
          )
        )
        dispatch(
          updateSubCategoryTotal(
            destinationSubcategory[0].ID,
            transactions[source.index].Amount
          )
        )
      }
      // reduce source subCategory total when moving transaction to another location
      if (source.droppableId === "subCategoryTransactionsList") {
        subCategories.forEach((subCategory) => {
          if (subCategory.ID === sourceSubCategoryID) {
            dispatch(
              updateSubCategoryTotal(
                sourceSubCategoryID,
                -transactions[source.index].Amount
              )
            )
          }
        })
      }
      return
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ThemeProvider theme={theme}>
        <Grid justifyContent={"center"} container spacing={1}>
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
              droppableID={"subCategoryTransactionsList"}
              subCategoryID={selectedSubCategoryID}
            />
          </Grid>
        </Grid>
        <div className="App">
          {/* <Paper className='TransactionCategory' elevation={4}> <h1>paper</h1></Paper> */}
        </div>
      </ThemeProvider>
    </DragDropContext>
  )
}
