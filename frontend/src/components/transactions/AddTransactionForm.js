import { useState, useEffect } from "react"
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
import Checkbox from "@mui/material/Checkbox"
import FetchError from "../../utils/fetchError"
import fetcher from "../../utils/fetchAuthorize"
import FormControlLabel from "@mui/material/FormControlLabel"
import CircularProgress from "@mui/material/CircularProgress"
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import classes from "./AddTransactionForm.module.css"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

const setDate = (props) => {
  let date = dayjs()

  // Subtract days
  props.type === "initial"
    ? (date = date.subtract(10, "day"))
    : props.type === "min"
    ? (date = date.subtract(90, "day"))
    : (date = date)

  return date
}

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
  const [accounts, setAccounts] = useState([])
  const [isAllAccounts, setIsAllAccounts] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(setDate({ type: "initial" }))
  const [dateHelperText, setDateHelperText] = useState("")
  const [isError, setIsError] = useState(false)

  const setDateError = (error) => {
    setIsError(true)
    if (error === "invalidDate") {
      setDateHelperText("Invalid date")
    } else if (error === "maxDate") {
      setDateHelperText("Date cannot be in the future")
    } else if (error === "minDate") {
      setDateHelperText("Date cannot be more than 90 days ago")
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
          setAccounts(responseJson)
        }
      } catch (error) {
        return []
      }
    }
    // format the subcategories for the autocomplete component if the user is adding a single transaction
    if (isSingleTransaction) {
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
    }
    getAccounts()
  }, [])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setSelectedAccounts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }
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

  const addTransactionsHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (isSingleTransaction) {
      transaction.subcategoryId === null
        ? addUnassignedTransactions((prevState) => [transaction, ...prevState])
        : addTransaction((prevState) => [transaction, ...prevState])
    } else {
      let ids = ""

      switch (isAllAccounts) {
        case true:
          accounts.forEach((account) => (ids = ids + "," + account.id))
          break
        case false:
          selectedAccounts.forEach((account) => (ids = ids + "," + account))
          break
        default:
          break
      }

      ids = ids.substring(1)
      try {
        const response = await fetcher(
          `http://localhost:8080/transactions?${new URLSearchParams({
            accountIds: ids,
            startDateOffset: dayjs().diff(startDate, "day")
          })}`
        )
        if (!response.ok) {
          throw new FetchError.fromResponse(response)
        } else if (response.status === 200) {
          let responseJson = await response.json()
          // add the account name to each transaction
          responseJson = responseJson.map(
            (transaction) =>
              (transaction = {
                ...transaction,
                accountName: accounts.find(
                  (account) => account.id === transaction.accountId
                ).name
              })
          )

          addUnassignedTransactions((prevState) => [
            ...responseJson,
            ...prevState
          ])
        }
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    setIsOpen(false)
  }

  return (
    <>
      <form
        onSubmit={(event) => addTransactionsHandler(event)}
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
                {(isSingleTransaction && (
                  <>
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
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isAllAccounts}
                          onChange={() => setIsAllAccounts(!isAllAccounts)}
                        />
                      }
                      label="Use all accounts?"
                    />
                    <FormControl>
                      <InputLabel id="accountsLabel">Accounts</InputLabel>
                      <Select
                        id="accountSelect"
                        labelId="accountsLabel"
                        disabled={isAllAccounts}
                        required
                        multiple
                        variant="outlined"
                        value={selectedAccounts}
                        input={<OutlinedInput label="Accounts" />}
                        onChange={handleChange}
                      >
                        {accounts.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newDate) => setStartDate(newDate)}
                      minDate={setDate({ type: "min" })}
                      maxDate={setDate({ type: "max" })}
                      onError={(error) => setDateError(error)}
                      slotProps={{ textField: { helperText: dateHelperText } }}
                    />
                  </>
                )}
              </Stack>
            </Box>
          </DialogContent>
        )}
        {!isLoading && (
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isError}>
              {isSingleTransaction ? "Add" : "Import"}
            </Button>
          </DialogActions>
        )}
      </form>
    </>
  )
}

export default AddTransactionsForm
