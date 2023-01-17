import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"

import { styled } from "@mui/material/styles"

import { createSingleTransaction } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"

const Item = styled(TextField)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: "7px"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(119,119,119,0.15)",
    borderRadius: "8px"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(119,119,119,.7)",
    borderRadius: "8px"
  }
}))

const AddTransactionForm_Single = ({ isOpen }) => {
  const [accountID, setAccountID] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [subcategoryID, setSubcategoryID] = useState("")
  const [categoryID, setCategoryID] = useState("")

  const subcategories = useSelector((state) => state.subcategories.value)

  const accounts = [
    { ID: 1, name: "PNC Checking 1234" },
    { ID: 2, name: "PNC Credit 4567" },
    { ID: 3, name: "Petal Checking 5426" }
  ]

  const dispatch = useDispatch()

  const createTransaction = (e) => {
    e.preventDefault()
    dispatch(
      createSingleTransaction({
        ID: 100,
        accountID: accountID,
        Description: description,
        Date: date,
        Amount: amount,
        isCredit: false,
        subcategoryID: subcategoryID || null,
        categoryID: categoryID || null
      })
    )

    dispatch(
      updateSubcategoryTotal({ subcategoryID: subcategoryID, amount: amount })
    )

    isOpen()
  }

  const updateCategories = (e) => {
    setSubcategoryID(e.target.value)

    let categoryID
    subcategories.forEach((subcategory) => {
      if (subcategory.ID === e.target.value) {
        categoryID = subcategory.categoryID
      }
    })
    setCategoryID(categoryID)
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
            <Item
              variant="outlined"
              label="Subcategory"
              select
              value={subcategoryID}
              onChange={(e) => updateCategories(e)}
            >
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory.ID} value={subcategory.ID}>
                  {subcategory.Name}
                </MenuItem>
              ))}
            </Item>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={isOpen}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </form>
  )
}

export default AddTransactionForm_Single
