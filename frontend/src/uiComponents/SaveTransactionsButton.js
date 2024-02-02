import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContentText from "@mui/material/DialogContentText"
import Dialog from "@mui/material/Dialog"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"
import fetcher from "../utils/fetchAuthorize"
import FetchError from "../utils/fetchError"
import Stack from "@mui/material/Stack"

const SaveTransactionsButton = ({
  transactions,
  unassignedTransactions,
  isActiveSubcategory,
  resetTransactions
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [assignToOther, setAssignToOther] = useState(false)
  const style = isActiveSubcategory
    ? null
    : { marginLeft: "-28px", position: "absolute", top: "50%" }

  const setAssignToOtherHandler = () => {
    setAssignToOther((prevState) => !prevState)
  }

  const saveTransactions = async () => {
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
    </>
  )
}
export default SaveTransactionsButton
