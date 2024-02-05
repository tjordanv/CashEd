import { useState, useEffect, useMemo } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Autocomplete from "@mui/material/Autocomplete"
import InputAdornment from "@mui/material/InputAdornment"
import { useLoaderData } from "react-router-dom"
import FetchError from "../../utils/fetchError"
import fetcher from "../../utils/fetchAuthorize"
import CircularProgress from "@mui/material/CircularProgress"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

const AddSingleTransaction = ({
  setIsOpen,
  addTransaction,
  addUnassignedTransactions
}) => {
  const transactionId = useMemo(() => {
    return Math.random().toString(36).substr(2, 10)
  }, [])

  const [transaction, setTransaction] = useState({
    accountId: "",
    accountName: "",
    name: "",
    date: null,
    amount: "",
    subcategoryId: null,
    categoryId: null
  })
  const [subcategories, setSubcategories] = useState(useLoaderData())
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dateHelperText, setDateHelperText] = useState("")
  const [isError, setIsError] = useState(false)

  const setDateError = (error) => {
    setIsError(true)
    if (error === "invalidDate") {
      setDateHelperText("Invalid date")
    } else if (error === "maxDate") {
      setDateHelperText("Date cannot be in the future")
    } else {
      setIsError(false)
      setDateHelperText("")
    }
  }

  useEffect(() => {
    // load in the user's accounts from the database
    const getAccounts = async () => {
      try {
        const response = await fetcher("http://localhost:8080/getAccounts")
        if (!response.ok) {
          throw new FetchError.fromResponse(response)
        } else if (response.status === 200) {
          const responseJson = await response.json()
          setAccounts([{ name: "None", id: "" }, ...responseJson])
        }
      } catch (error) {
        return []
      }
    }
    // format the subcategories for the autocomplete component
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

    getAccounts()
  }, [])

  const updateTransactionHandler = (updatedField) => {
    let value
    let accountName

    switch (updatedField.name) {
      case "amount":
        value = parseFloat(updatedField.value)
        break
      case "accountId":
        value = updatedField.value
        accountName = accounts.find(
          (account) => account.id === updatedField.value
        ).name
        break
      default:
        value = updatedField.value
        break
    }
    setTransaction((prevState) => {
      const newState = { ...prevState, [updatedField.name]: value }
      if (accountName) {
        newState.accountName = accountName
      }
      return newState
    })
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

  const addTransactionHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // format the date
    const transactionToAdd = {
      ...transaction,
      date: transaction.date
        ? transaction.date.format("YYYY-MM-DD")
        : transaction.date,
      transactionId: transactionId
    }

    transaction.subcategoryId === null
      ? addUnassignedTransactions((prevState) => [
          transactionToAdd,
          ...prevState
        ])
      : addTransaction((prevState) => [transactionToAdd, ...prevState])
    console.log(transactionToAdd)
    setIsOpen(false)
  }

  return (
    <>
      <form
        onSubmit={(event) => addTransactionHandler(event)}
        style={{ minWidth: "400px" }}
      >
        {(isLoading && (
          <Box
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress />
          </Box>
        )) || (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            <Box sx={{ padding: "15px" }}>
              <Stack spacing={2}>
                <TextField
                  id="accountSelect"
                  select
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
                  value={transaction.name}
                  onChange={(e) =>
                    updateTransactionHandler({
                      name: "name",
                      value: e.target.value
                    })
                  }
                />
                <DatePicker
                  label="Transaction Date"
                  value={transaction.date}
                  onChange={(newDate) =>
                    updateTransactionHandler({ name: "date", value: newDate })
                  }
                  maxDate={dayjs()}
                  onError={(error) => setDateError(error)}
                  slotProps={{
                    field: { clearable: true },
                    textField: { helperText: dateHelperText }
                  }}
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
              </Stack>
            </Box>
          </DialogContent>
        )}
        {!isLoading && (
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isError}>
              Add
            </Button>
          </DialogActions>
        )}
      </form>
    </>
  )
}

export default AddSingleTransaction
