import { forwardRef, useState } from "react"

import Box from "@mui/material/Box"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

import AddTransactionForm from "./AddTransactionForm"
import AddTransactionMenuButtons from "./AddTransactionMenuButtons"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddTransactions = ({ addTransactions }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSingleTransaction, setIsSingleTransaction] = useState(false)

  return (
    <Box>
      <AddTransactionMenuButtons
        setIsOpen={setIsOpen}
        setIsSingleTransaction={setIsSingleTransaction}
      />
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
        <AddTransactionForm
          setIsOpen={setIsOpen}
          addTransactions={addTransactions}
          isSingleTransaction={isSingleTransaction}
        />
      </Dialog>
    </Box>
  )
}
export default AddTransactions
