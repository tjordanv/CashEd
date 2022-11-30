import data from "./app/data"
import "./styles.css"

import { useDispatch, useSelector } from "react-redux"

import { DragDropContext } from "react-beautiful-dnd"

import { Divider, IconButton, Typography } from "@mui/material"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Grid } from "@mui/material"

import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined"
import SaveIcon from "@mui/icons-material/Save"
import PrintIcon from "@mui/icons-material/Print"
import ShareIcon from "@mui/icons-material/Share"

import TransactionsList from "./components/transactionsList"
import TransactionCategories from "./components/transactionCategories"
import Header from "./components/header"

import {
  importTransactions,
  reorderTransactions,
  addSubcategory
} from "./state/transactionsSlice"
import { updateSubcategoryTotal } from "./state/subcategoriesSlice"
import { Container, Stack } from "@mui/system"
import { DownloadForOfflineRounded, EditRounded } from "@mui/icons-material"
import { useState } from "react"
import { updateSelectedTotal } from "./state/selectedSubcategorySlice"

const dataSet = data

const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2"
    },
    lightWhite: {
      main: "rgba(255, 255, 255, 0.9)"
    },
    greyText: {
      main: "#454545"
    }
  }
})

export default function App() {
  const TransactionImportsContainer = styled(Container)(({ theme }) => ({
    minHeight: "93.5vh",
    width: "250px",
    margin: 0,
    padding: 0
  }))

  const dispatch = useDispatch()

  const subcategories = useSelector((state) => state.subcategories.value)
  const transactions = useSelector((state) => state.transactions.value)
  // the selected subcategory logic will need toi run after data is loaded in.
  const selectedSubcategory = useSelector((state) => {
    try {
      state.subcategories.value.filter((subcategory) => subcategory.isSelected)
    } catch (e) {}
  })

  const [isTransactions, setIsTransactions] = useState(false)

  const imports = (transactions) => {
    dispatch(importTransactions(dataSet.transactions))
    setIsTransactions(true)
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
      // Update selectedCategory information when dropping into or out of selectedCategory
      if (destinationSubcategory[0].ID === selectedSubcategory.ID) {
        dispatch(updateSelectedTotal(transactions[source.index].Amount))
      } else if (sourceSubcategoryID === selectedSubcategory.ID) {
        dispatch(updateSelectedTotal(-transactions[source.index].Amount))
      }
      return
    }
  }

  const actions = [
    {
      icon: <DownloadForOfflineRounded fontSize="small" />,
      name: "Automatic Import",
      onClick: imports
    },
    { icon: <EditRounded />, name: "Manual Entry" }
  ]

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ThemeProvider theme={theme}>
        <Header />
        <Stack direction="row" spacing={3}>
          <TransactionImportsContainer>
            <Typography
              sx={{
                textAlign: "center",
                color: "#451115",
                fontStyle: "italic",
                marginTop: "20px"
              }}
            >
              Imported Transactions
            </Typography>
            <Divider />
            <TransactionsList droppableID={"importedTransactionsList"} />
            <Divider />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{
                position: "absolute",
                top: isTransactions ? null : "45%",
                left: isTransactions ? null : "90px",
                "& .MuiFab-primary": { width: 38, height: 38 }
              }}
              icon={<SpeedDialIcon />}
              direction={isTransactions ? "right" : "down"}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.onClick}
                  sx={{ height: 35, width: 35 }}
                />
              ))}
            </SpeedDial>
          </TransactionImportsContainer>
          <Container
            sx={{
              borderLeft: "2px solid rgba(119, 119, 119, 0.2)",
              borderRight: "2px solid rgba(119, 119, 119, 0.2)"
            }}
          >
            <TransactionCategories />
          </Container>

          <TransactionImportsContainer>
            {/* <Typography
              sx={{
                textAlign: "center",
                color: "#451115",
                fontStyle: "italic",
                marginTop: "20px"
              }}
            >
              {selectedSubcategory.Name}
            </Typography>
            <Typography>{selectedSubcategory.Total}</Typography> */}
            <TransactionsList
              droppableID={"subcategoryTransactionsList"}
              subcategoryID={selectedSubcategory.ID}
            />
          </TransactionImportsContainer>
        </Stack>
      </ThemeProvider>
    </DragDropContext>
  )
}
