import { useDispatch, useSelector } from "react-redux"
import { useState, forwardRef } from "react"

import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded"
import EditRounded from "@mui/icons-material/EditRounded"

import AddTransactionFormSingle from "./AddTransactionFormSingle"
import AddTransactionsFormImport from "./AddTransactionFormImport"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddTransactionForm = () => {
  const dispatch = useDispatch()

  const isTransactions = useSelector(
    (state) =>
      state.transactions.value.filter(
        (transaction) => transaction.subcategoryID === null
      ).length > 0
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isSingleTransaction, setIsSingleTransaction] = useState(false)

  const openDialog = (isAddTransaction) => {
    setIsOpen(true)
    isAddTransaction === true && setIsSingleTransaction(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setIsSingleTransaction(false)
  }

  return (
    <Box>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted={false}
        disableRestoreFocus={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {isSingleTransaction === true ? "Single Transaction Entry" : "Import"}
        </DialogTitle>
        {isSingleTransaction === true ? (
          <AddTransactionFormSingle isOpen={closeDialog} />
        ) : (
          <AddTransactionsFormImport isOpen={closeDialog} />
        )}
      </Dialog>
    </Box>
  )
}
export default AddTransactionForm
