import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import data from "../../app/data"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Autocomplete from "@mui/material/Autocomplete"
import InputAdornment from "@mui/material/InputAdornment"
import { useLoaderData } from "react-router-dom"

const AddTransactionsForm = ({
  setIsOpen,
  addTransaction,
  addUnassignedTransactions,
  isSingleTransaction
}) => {
  const [transaction, setTransaction] = useState({
    id: Math.floor(Math.random() * 99999),
    accountId: "",
    name: "",
    date: "",
    amount: "",
    subcategoryId: null,
    categoryId: null
  })
  const [subcategories, setSubcategories] = useState(useLoaderData())
  const [accounts, setAccounts] = useState([
    { id: 1, name: "PNC Checking 1234" },
    { id: 2, name: "PNC Credit 4567" },
    { id: 3, name: "Petal Checking 5426" }
  ])

  useEffect(() => {
    const mergedSubcategories = [
      ...subcategories[0],
      ...subcategories[1],
      ...subcategories[2],
      ...subcategories[3]
    ]
    let formattedSubcategories = []
    mergedSubcategories.forEach((subcategory) =>
      formattedSubcategories.push({
        id: subcategory.id,
        categoryId: subcategory.categoryId,
        label: subcategory.name
      })
    )
    setSubcategories(formattedSubcategories)
  }, [])

  const updateTransactionHandler = (updatedField) => {
    const value =
      updatedField.name === "amount"
        ? parseFloat(updatedField.value)
        : updatedField.value
    setTransaction((prevState) => ({
      ...prevState,
      [updatedField.name]: value
    }))
  }
  const updateSubcategoryId = (event, value) => {
    if (value === null) {
      setTransaction((prevState) => ({
        ...prevState,
        subcategoryId: null,
        categoryId: null
      }))
    } else {
      setTransaction((prevState) => ({
        ...prevState,
        subcategoryId: value.id,
        categoryId: value.categoryId
      }))
    }
  }

  const imports = (e) => {
    e.preventDefault()

    if (isSingleTransaction) {
      transaction.subcategoryId === null
        ? addUnassignedTransactions((prevState) => [transaction, ...prevState])
        : addTransaction((prevState) => [transaction, ...prevState])
    } else {
      addUnassignedTransactions((prevState) => [
        ...data.transactions,
        ...prevState
      ])
    }
    setIsOpen(false)
  }

  return (
    <form onSubmit={(event) => imports(event)} style={{ minWidth: "400px" }}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        <Box sx={{ padding: "15px" }}>
          <Stack spacing={2}>
            {(isSingleTransaction && (
              <>
                <TextField
                  id="accountSelect"
                  select
                  required
                  variant="outlined"
                  label="Account"
                  value={transaction.accountId}
                  onChange={(e) =>
                    updateTransactionHandler({
                      name: "accountId",
                      value: e.target.value
                    })
                  }
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  label="Name"
                  required
                  multiline
                  maxRows={5}
                  value={transaction.name}
                  onChange={(e) =>
                    updateTransactionHandler({
                      name: "name",
                      value: e.target.value
                    })
                  }
                />
                <TextField
                  variant="outlined"
                  type="date"
                  label="Transaction Date"
                  InputLabelProps={{ shrink: true }}
                  value={transaction.date}
                  onChange={(e) =>
                    updateTransactionHandler({
                      name: "date",
                      value: e.target.value
                    })
                  }
                />
                <TextField
                  variant="outlined"
                  type="number"
                  required
                  label="Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                  value={transaction.amount}
                  onChange={(e) =>
                    updateTransactionHandler({
                      name: "amount",
                      value: e.target.value
                    })
                  }
                />
                <Autocomplete
                  onChange={updateSubcategoryId}
                  options={subcategories}
                  renderInput={(params) => (
                    <TextField {...params} label="Subcategory" />
                  )}
                />
              </>
            )) || (
              <TextField
                id="accountSelect"
                select
                required
                multiple
                variant="outlined"
                label="Account"
                value={transaction.accountId}
                onChange={(e) =>
                  updateTransactionHandler({
                    name: "accountId",
                    value: e.target.value
                  })
                }
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit">Import</Button>
      </DialogActions>
    </form>
  )
}

export default AddTransactionsForm
