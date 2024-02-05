import { forwardRef, useState } from "react"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import AddTransactionMenuButtons from "./AddTransactionMenuButtons"
import AddSingleTransaction from "./AddSingleTransaction"
import ImportTransactions from "./ImportTransactions"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddTransactions = ({
  addTransaction,
  addUnassignedTransactions,
  isTransactions
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSingleTransaction, setIsSingleTransaction] = useState(false)

  return (
    <Box>
      <AddTransactionMenuButtons
        setIsOpen={setIsOpen}
        setIsSingleTransaction={setIsSingleTransaction}
        isTransactions={isTransactions}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        TransitionComponent={Transition}
        keepMounted={false}
        disableRestoreFocus={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {isSingleTransaction === true ? "Transaction Entry" : "Import"}
        </DialogTitle>
        {(isSingleTransaction && (
          <AddSingleTransaction
            setIsOpen={setIsOpen}
            addTransaction={addTransaction}
            addUnassignedTransactions={addUnassignedTransactions}
          />
        )) || (
          <ImportTransactions
            setIsOpen={setIsOpen}
            addUnassignedTransactions={addUnassignedTransactions}
          />
        )}
      </Dialog>
    </Box>
  )
}
export default AddTransactions
