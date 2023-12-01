import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import { Box, Chip, Divider, IconButton, List, Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import FetchError from "../utils/fetchError"
import AccountCardsList from "../components/accounts/AccountCardsList"
import classes from "./Accounts.module.css"
import AddCircleIcon from "@mui/icons-material/AddCircle"

const accountsLoader = async () => {
  try {
    const response = await fetcher("http://localhost:8080/getAccounts")
    if (!response.ok) {
      throw new FetchError.fromResponse(response)
    } else if (response.status === 200) {
      return await response.json()
    }
  } catch (error) {
    return []
  }
}
export { accountsLoader }
const Accounts = () => {
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState(useLoaderData())
  const [newAccounts, setNewAccounts] = useState([])

  const saveAccountHandler = async (id, nickname) => {
    const checkAccounts = async (accountsArray, setAccountHandler) => {
      if (!accountsArray) return false

      let tempAccounts = accountsArray
      for (let i = 0; i < tempAccounts.length; i++) {
        if (tempAccounts[i].id === id) {
          tempAccounts[i].nickname = nickname
          // make api request to save updated account
          const response = await fetcher(
            `http://localhost:8080/updateAccount?${new URLSearchParams({
              id: id,
              nickname: nickname
            })}`,
            {
              method: "PUT",
              mode: "cors",
              headers: { "Content-Type": "application/json" }
            }
          )
          if (!response.ok) {
            throw new FetchError.fromResponse(response)
          } else if (response.status === 200) {
            if (!response.json()) {
              throw new Error("Account not updated")
            } else {
              setAccountHandler(tempAccounts)
              return true
            }
          }
        }
      }
      return false
    }

    if (await checkAccounts(newAccounts, setNewAccounts)) {
      return
    } else {
      await checkAccounts(accounts, setAccounts)
    }
  }

  const removeAccountHandler = async (id) => {
    try {
      const response = await fetcher(
        `http://localhost:8080/deleteAccount?${new URLSearchParams({
          id: id
        })}`,
        {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )
      if (!response.ok) {
        throw new FetchError.fromResponse(response)
      } else if (response.status === 200) {
        if (!response.json()) {
          throw new Error("Account not deleted")
        } else {
          const tempAccounts = newAccounts.filter(
            (account) => account.id !== id
          )
          if (tempAccounts.length === newAccounts.length) {
            const tempAccounts = accounts.filter((account) => account.id !== id)

            setAccounts(tempAccounts)
          } else {
            setNewAccounts(tempAccounts)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSuccess = useCallback(async (publicToken, metadata) => {
    //console.log("publicToken: " + publicToken)
    setLoading(true)
    const accessTokenResponse = await fetcher(
      "http://localhost:8080/exchangePublicToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: publicToken
        })
      }
    )
    const accessTokenResponseJson = await accessTokenResponse.json()
    accessTokenResponseJson.forEach((account) => (account.isSelected = true))
    setNewAccounts(accessTokenResponseJson)
  }, [])

  // Creates a Link token
  const createLinkToken = useCallback(async () => {
    const response = await fetcher("http://localhost:8080/createLinkToken", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setToken(data.token)
  }, [setToken])

  // Select and save accounts
  const saveAccounts = () => {}

  // Fetch balance data
  const getBalance = useCallback(
    async (accessToken) => {
      setLoading(true)
      const response = await fetcher(
        `http://localhost:8080/accountBalance?${new URLSearchParams({
          accessToken: accessToken
        })}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const data = await response.json()
      setData(data)
      setLoading(false)
    },
    [setData, setLoading]
  )

  // Fetch Transactions
  const getTransactions = useCallback(
    async (accessToken) => {
      setLoading(true)
      const response = await fetcher(
        `http://localhost:8080/transactions?${new URLSearchParams({
          accessToken: accessToken
        })}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const data = await response.json()
      setData(data)
      setLoading(false)
    },
    [setData, setLoading]
  )

  const config = {
    onSuccess: onSuccess,
    token: token,
    onExit: (error, metadata) => {
      console.log(error)
      console.log(metadata)
    }
  }
  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    const fetchData = async () => {
      if (token == null) {
        await createLinkToken()
      }
    }
    fetchData()
  }, [token, ready, open])

  return (
    <Box className={classes.container}>
      <IconButton
        className={classes.addButton}
        onClick={() => open()}
        disabled={!ready}
        aria-label="Add Accounts"
        color="primary"
      >
        <AddCircleIcon sx={{ fontSize: "50px" }} />
      </IconButton>
      <Divider orientation="vertical" flexItem sx={{ margin: "65px 30px" }} />
      <Box className={classes.accounts}>
        <Typography variant="h6">Connected Accounts</Typography>
        <List className={classes.accountsList}>
          {newAccounts.length > 0 && (
            <Box>
              <Divider sx={{ width: "500px", margin: "5px" }}>
                <Chip label="NEW" />
              </Divider>
            </Box>
          )}
          <AccountCardsList
            accounts={newAccounts}
            removeAccountHandler={removeAccountHandler}
            saveAccountHandler={saveAccountHandler}
          />
          {newAccounts.length > 0 && (
            <Divider sx={{ width: "500px", margin: "20px" }} />
          )}
          <AccountCardsList
            accounts={accounts}
            removeAccountHandler={removeAccountHandler}
            saveAccountHandler={saveAccountHandler}
          />
        </List>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ margin: "65px 30px" }} />
    </Box>
  )
}
export default Accounts

{
  /* <button onClick={() => open()} disabled={!ready}>
<strong>Link account</strong>
</button>

<button onClick={() => getBalance(accessToken)}>get balance</button>
<button onClick={() => getTransactions(accessToken)}>
get transactions
</button>
<button onClick={() => console.log("accounts: " + accounts[0])}>
log
</button>
{!loading &&
data != null &&
Object.entries(data).map((entry, i) => (
  <pre key={i}>
    <code>{JSON.stringify(entry[1], null, 2)}</code>
  </pre>
))} */
}
