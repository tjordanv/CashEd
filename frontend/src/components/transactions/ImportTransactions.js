import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Checkbox from "@mui/material/Checkbox"
import FetchError from "../../utils/fetchError"
import fetcher from "../../utils/fetchAuthorize"
import FormControlLabel from "@mui/material/FormControlLabel"
import CircularProgress from "@mui/material/CircularProgress"
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material"
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

const ImportTransactions = ({ setIsOpen, addUnassignedTransactions }) => {
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

  const addTransactionsHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

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
              </Stack>
            </Box>
          </DialogContent>
        )}
        {!isLoading && (
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isError}>
              Import
            </Button>
          </DialogActions>
        )}
      </form>
    </>
  )
}

export default ImportTransactions
