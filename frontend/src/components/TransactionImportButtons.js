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

import AddTransactionForm from "./AddTransactionFormSingle"
import ImportTransactionsForm from "./AddTransactionFormImport"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TransactionImportButtons = () => {
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
        <SpeedDialAction
          key="import"
          icon={<DownloadForOfflineRounded fontSize="small" />}
          tooltipTitle="Automatic Import"
          onClick={() => openDialog(false)}
          sx={{ height: 35, width: 35 }}
        />
        <SpeedDialAction
          key="AddSingleTransaction"
          icon={<EditRounded fontSize="small" />}
          tooltipTitle="Add Single Transaction"
          onClick={() => openDialog(true)}
          sx={{ height: 35, width: 35 }}
        />
      </SpeedDial>
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
          <AddTransactionForm isOpen={closeDialog} />
        ) : (
          <ImportTransactionsForm isOpen={closeDialog} />
        )}
      </Dialog>
    </Box>
  )
}
export default TransactionImportButtons
