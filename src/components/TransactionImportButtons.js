import { useDispatch, useSelector } from "react-redux"
import { useState, forwardRef } from "react"

import data from "../app/data"
import { importTransactions } from "../state/transactionsSlice"

import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"

import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import Slide from "@mui/material/Slide"
import Button from "@mui/material/Button"

import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded"
import EditRounded from "@mui/icons-material/EditRounded"

const TransactionImportButtons = () => {
  const dispatch = useDispatch()

  const isTransactions = useSelector((state) => state.transactions.length > 0)
  const [isOpen, setIsOpen] = useState(false)
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)

  const openSpeedDial = () => {
    setIsSpeedDialOpen(true)
  }

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setIsSpeedDialOpen(false)
  }

  const imports = (transactions) => {
    dispatch(importTransactions(data.transactions))
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const actions = [
    {
      icon: <DownloadForOfflineRounded fontSize="small" />,
      name: "Automatic Import",
      onClick: imports
    },
    { icon: <EditRounded />, name: "Manual Entry", onClick: openDialog }
  ]

  return (
    <Box>
      <SpeedDial
        open={isSpeedDialOpen}
        onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
        onMouseOver={() => setIsSpeedDialOpen(true)}
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
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted={false}
        //disableRestoreFocus={"true"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This cannot be undone and this transaction will not appear in future imports.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TransactionImportButtons
