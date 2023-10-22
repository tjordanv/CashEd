import { useState, useEffect } from "react"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import { Autocomplete } from "@mui/material"
import { useLoaderData } from "react-router-dom"

const AddTransactionForm_Single = ({ closeDialog }) => {
  const [accountID, setAccountID] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [subcategoryID, setSubcategoryID] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [subcategories, setSubcategories] = useState(useLoaderData())

  useEffect(() => {
    console.log(subcategories)
    const mergedSubcategories = [
      ...subcategories[0],
      ...subcategories[1],
      ...subcategories[2],
      ...subcategories[3]
    ]
    let formattedSubcategories = []
    mergedSubcategories.foreach((subcategory) =>
      formattedSubcategories.append({
        id: subcategory.id,
        label: subcategory.name
      })
    )
    setSubcategories(formattedSubcategories)
  }, [])

  const accounts = [
    { ID: 1, name: "PNC Checking 1234" },
    { ID: 2, name: "PNC Credit 4567" },
    { ID: 3, name: "Petal Checking 5426" }
  ]

  const createTransaction = (e) => {
    e.preventDefault()

    closeDialog()
  }

  return (
    <form onSubmit={(e) => createTransaction(e)} style={{ minWidth: "400px" }}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        <Box sx={{ padding: "15px" }}>
          <Stack spacing={2}>
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
              label="Description"
              required
              multiline
              maxRows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="date"
              label="Transaction Date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Autocomplete
              options={subcategories}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" />
              )}
            />
            {/* <Select
              variant="outlined"
              label="Subcategory"
              select
              value={subcategoryID}
              // onChange={(e) => updateCategories(e)}
            >
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory.ID} value={subcategory.ID}>
                  {subcategory.Name}
                </MenuItem>
              ))}
            </Select> */}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </form>
  )
}

export default AddTransactionForm_Single
