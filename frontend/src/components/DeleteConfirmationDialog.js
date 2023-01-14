import { forwardRef, useState } from "react"

import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"

import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Zoom from "@mui/material/Zoom"
import DeleteIcon from "@mui/icons-material/Delete"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DeleteConfirmationDialog = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialogHandler = () => {
    setIsOpen(true)
  }

  const closeDialogHandler = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted={false}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This cannot be undone and this transaction will not appear in future imports.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Cancel</Button>
          <Button onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
        <IconButton sx={{ padding: "auto" }} onClick={openDialogHandler}>
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default DeleteConfirmationDialog
