import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { styled } from "@mui/material/styles"
import { deleteTransaction } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"

import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import Card from "@mui/material/Card"
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import Slide from "@mui/material/Slide"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import Zoom from "@mui/material/Zoom"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/Info"

import { forwardRef, useState } from "react"

const Transaction = ({ transaction, index }) => {
  const Item = styled(Card)(({ theme }) => ({
    display: "flex",
    backgroundColor:
      transaction.categoryID === null && !transaction.isCredit
        ? "rgba(119, 119, 119, 0.15)"
        : transaction.isCredit === true
        ? "rgba(23, 195, 178, 0.3)"
        : transaction.categoryID === 1
        ? "rgba(23, 195, 178, 0.3)"
        : transaction.categoryID === 2
        ? "rgba(34, 124, 157, 0.4)"
        : transaction.categoryID === 3
        ? "rgba(255, 203, 119, 0.4)"
        : "rgba(254, 109, 115, 0.4)",
    minWidth: "175px",
    minHeight: "32px",
    flexShrink: 0,
    position: "relative",
    borderColor: "#ffffff",
    "&:hover": { border: "1px solid red" }
  }))

  const TransactionText = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontSize: "12px",
    minWidth: "160px"
  }))

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const deleteTrans = () => {
    if (transaction.subcategoryID) {
      dispatch(
        updateSubcategoryTotal({
          subcategoryID: transaction.subcategoryID,
          amount: -transaction.Amount
        })
      )
    }
    dispatch(deleteTransaction(index))
    setIsOpen(false)
  }

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const log = () => {
    console.log(transaction)
  }
  return (
    // I may need to add additional identifiers to the draggableID to account for transactions
    // having the same description/name
    <Draggable draggableId={transaction.Description} index={index} key={transaction.ID}>
      {(provided, snapshot) => (
        <Item
          // className={`Transaction ${transaction.isCredit && "credit"}`}
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={log}
        >
          <Tooltip
            title={
              <>
                <Typography variant="subtitle2">
                  <span className="TransactionToolTipUnderlinedText">
                    <u>Date:</u>
                  </span>
                  {transaction.date}
                </Typography>
                <Typography variant="subtitle2">
                  <span className="TransactionToolTipUnderlinedText">
                    <u>Description:</u>
                  </span>
                  {transaction.Description}
                </Typography>
                <Typography variant="subtitle2">
                  <span className="TransactionToolTipUnderlinedText">
                    <u>Amount:</u>
                  </span>
                  {transaction.Amount}
                </Typography>
              </>
            }
            placement="right"
          >
            <InfoIcon
              fontSize="small"
              sx={{ margin: "auto 0 auto 0", color: "#777777" }}
            />
          </Tooltip>
          <Box sx={{ margin: "auto 0 auto 5px", width: "85%" }}>
            <TransactionText
              variant="body2"
              align="center"
              sx={{ paddingTop: "2px", paddingBottom: "2px" }}
            >
              {transaction.Description}
            </TransactionText>
            <Divider variant="middle" light="true" />
            <TransactionText
              variant="body2"
              align="center"
              sx={{ fontWeight: "600", paddingTop: "2px", paddingBottom: "2px" }}
            >
              {"$" + transaction.Amount}
            </TransactionText>
          </Box>
          <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
            <IconButton onClick={openDialog}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                This cannot be undone and this transaction will not appear in future
                imports.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={deleteTrans}>Delete</Button>
            </DialogActions>
          </Dialog>
        </Item>
      )}
    </Draggable>
  )
}

export default Transaction
