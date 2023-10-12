import { useState } from "react"

import { useDispatch } from "react-redux"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"

import { importTransactions } from "../../state/transactionsSlice"
import data from "../../app/data copy"

const AddTransactionsForm_Import = ({ closeDialog }) => {
  const [accountID, setAccountID] = useState("")
  const [date, setDate] = useState("")

  const accounts = [
    { ID: 1, name: "PNC Checking 1234" },
    { ID: 2, name: "PNC Credit 4567" },
    { ID: 3, name: "Petal Checking 5426" }
  ]

  const dispatch = useDispatch()

  const imports = (event) => {
    event.preventDefault()
    dispatch(importTransactions(data.transactions))
    closeDialog()
  }

  return (
    <form onSubmit={(event) => imports(event)} style={{ minWidth: "400px" }}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        <Box sx={{ padding: "15px" }}>
          <Stack spacing={1}>
            <TextField
              id="accountSelect"
              select
              required
              variant="outlined"
              label="Account"
              value={accountID}
              onChange={(e) => setAccountID(e.target.value)}
            >
              {accounts.map((account) => (
                <MenuItem key={account.ID} value={account.ID}>
                  {account.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              type="date"
              required
              label="Starting date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit">Import</Button>
      </DialogActions>
    </form>
  )
}

export default AddTransactionsForm_Import
