import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../components/HelperFunctions/fetchAuthorize"
import { Box, Chip, Divider, IconButton, List, Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import FetchError from "../components/HelperComponents/FetchError"
import AccountCardsList from "../components/AccountCardsList"
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

  const updateNicknameHandler = (id, value) => {
    let tempAccounts = newAccounts

    for (let i = 0; i < tempAccounts.length; i++) {
      if (tempAccounts[i].id === id) {
        tempAccounts[i].nickname = value

        setNewAccounts(tempAccounts)
        return
      }
    }
    tempAccounts = accounts
    for (let i = 0; i < tempAccounts.length; i++) {
      if (tempAccounts[i].id === id) {
        tempAccounts[i].nickname = value

        setAccounts(tempAccounts)
        return
      }
    }
  }
  // const updateAccountHandler = (id) => {
  //   const tempAccounts = newAccounts
  //   tempAccounts.forEach((account) => {
  //     if (account.id === id) {
  //       account.nickname =
  //     }
  //   }

  //   if (tempAccounts.length === newAccounts.length) {
  //     const tempAccounts = accounts.filter((account) => account.id !== id)

  //     setAccounts(tempAccounts)
  //   } else {
  //     setNewAccounts(tempAccounts)
  //   }
  //   newAccounts[index] = {
  //     ...newAccounts[index],
  //     isSelected: value
  //   }
  //   setAccounts(newAccounts)
  // }

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
            updateNicknameHandler={updateNicknameHandler}
          />
          {newAccounts.length > 0 && (
            <Divider sx={{ width: "500px", margin: "20px" }} />
          )}
          <AccountCardsList
            accounts={accounts}
            removeAccountHandler={removeAccountHandler}
            updateNicknameHandler={updateNicknameHandler}
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
