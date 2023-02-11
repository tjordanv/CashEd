import { useDispatch, useSelector } from "react-redux"
import { forwardRef } from "react"

import Box from "@mui/material/Box"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

import AddTransactionFormSingle from "./AddTransactionFormSingle"
import AddTransactionsFormImport from "./AddTransactionFormImport"
import { isDialogOpen } from "../../state/addTransactionDialogSlice"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddTransactionForm = () => {
  const { isOpen, isSingleTransaction } = useSelector(
    (state) => state.addTransactionDialog.value
  )

  const dispatch = useDispatch()

  const closeDialogHandler = () => {
    dispatch(isDialogOpen(false))
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
          <AddTransactionFormSingle closeDialog={closeDialogHandler} />
        ) : (
          <AddTransactionsFormImport closeDialog={closeDialogHandler} />
        )}
      </Dialog>
    </Box>
  )
}
export default AddTransactionForm
