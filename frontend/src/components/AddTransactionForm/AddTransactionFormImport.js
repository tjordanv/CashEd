import { useState } from "react"

import { useDispatch } from "react-redux"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import data from "../../app/data"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"

const AddTransactionsFormImport = ({ setIsOpen, addTransactions }) => {
  const [accountIds, setAccountIds] = useState("")

  const accounts = [
    { Id: 1, name: "PNC Checking 1234" },
    { Id: 2, name: "PNC Credit 4567" },
    { Id: 3, name: "Petal Checking 5426" }
  ]

  const imports = (e) => {
    e.preventDefault()

    addTransactions((prevState) => [...prevState, ...data.transactions])
    setIsOpen(false)
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
              multiple
              variant="outlined"
              label="Account"
              value={accountIds}
              onChange={(e) => setAccountIds(e.target.value)}
            >
              {accounts.map((account) => (
                <MenuItem key={account.Id} value={account.Id}>
                  {account.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={setIsOpen}>Cancel</Button>
        <Button type="submit">Import</Button>
      </DialogActions>
    </form>
  )
}

export default AddTransactionsFormImport
