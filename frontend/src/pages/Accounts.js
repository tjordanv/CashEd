import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../components/HelperFunctions/fetchAuthorize"
import { Box, Stack } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import NewAccountCard from "../components/NewAccountCard"
import { useLoaderData } from "react-router-dom"
import FetchError from "../components/HelperComponents/FetchError"

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
  const [accessToken, setAccessToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState(useLoaderData())

  const setAccountsHandler = ({ index, value }) => {
    const newAccounts = [...accounts]

    newAccounts[index] = {
      ...newAccounts[index],
      isSelected: value
    }
    setAccounts(newAccounts)
  }
  const removeAccountHandler = ({ accountId }) => {
    const newAccounts = accounts.filter(
      (account) => account.accountId !== accountId
    )
    setAccounts(newAccounts)
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
    setAccounts(accessTokenResponseJson)
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
    <div>
      <button onClick={() => open()} disabled={!ready}>
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
        ))}
      {accounts && (
        <Stack spacing={3}>
          {accounts.map((account) => (
            <NewAccountCard
              key={account.accountId}
              account={account}
              removeAccountHandler={removeAccountHandler}
            />
          ))}
        </Stack>
      )}
    </div>
  )
}
export default Accounts
// accounts.map((account, index) => <NewAccountCard account={account} />)}
