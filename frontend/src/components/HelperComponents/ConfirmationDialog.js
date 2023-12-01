import { forwardRef, useState } from "react"

import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import FormButton from "../../uiComponents/FormButton"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmationDialog = ({
  dialogDetails,
  onConfirm,
  Component,
  componentDetails
}) => {
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
        <DialogTitle sx={{ padding: "30px" }}>
          {dialogDetails.title}
        </DialogTitle>
        {dialogDetails.description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogDetails.description}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <FormButton onClick={closeDialogHandler} label="cancel" />
          <FormButton
            color="danger"
            onClick={onConfirm}
            label={dialogDetails.confirmationLabel}
          />
        </DialogActions>
      </Dialog>
      <Component func={openDialogHandler} obj={componentDetails} />
    </>
  )
}

export default ConfirmationDialog
