import { useState } from "react"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContentText from "@mui/material/DialogContentText"
import Dialog from "@mui/material/Dialog"
import Switch from "@mui/material/Switch"
import fetcher from "../utils/fetchAuthorize"
import FetchError from "../utils/fetchError"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

const SaveTransactionsButton = ({
  transactions,
  unassignedTransactions,
  isActiveSubcategory,
  resetTransactions
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [assignToOther, setAssignToOther] = useState(false)
  const style = isActiveSubcategory
    ? null
    : { marginLeft: "-28px", position: "absolute", top: "50%" }

  const setAssignToOtherHandler = () => {
    setAssignToOther((prevState) => !prevState)
  }
  const closeHandler = () => {
    setIsSuccessful(false)
  }

  const saveTransactions = async () => {
    setIsLoading(true)
    let requestBody = [...transactions]
    try {
      if (assignToOther) {
        unassignedTransactions = unassignedTransactions.map((transaction) => ({
          ...transaction,
          subcategoryId: 999,
          categoryId: 5
        }))
        requestBody = [...requestBody, ...unassignedTransactions]
      }
      const response = await fetcher("http://localhost:8080/saveTransactions", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      } else {
        const responseJson = await response.json()
        if (responseJson) {
          resetTransactions()
        }
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
    setIsSuccessful(true)
  }

  const saveHandler = () => {
    if (unassignedTransactions.length > 0) {
      setIsOpen(true)
    } else {
      saveTransactions()
    }
  }

  const dialogSaveHandler = () => {
    saveTransactions()
    setIsOpen(false)
  }
  return (
    <>
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "14px" }}
        style={style}
        onClick={saveHandler}
        disabled={
          transactions.length === 0 && unassignedTransactions.length === 0
        }
      >
        Save
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Unassigned Transactions</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ display: "flex" }}>
            Do you want to save all unassigned transactions to "Other"?
            Otherwise, they will be discarded.
            <span style={{ display: "flex", alignItems: "center" }}>
              No
              <Switch onClick={setAssignToOtherHandler} />
              Yes
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={dialogSaveHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={isSuccessful}
        autoHideDuration={5000}
        onClose={closeHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={closeHandler}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Transactions Saved.
        </Alert>
      </Snackbar>
    </>
  )
}
export default SaveTransactionsButton
