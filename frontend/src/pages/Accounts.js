import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../components/HelperFunctions/fetchAuthorize"

const Accounts = () => {
  const [token, setToken] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState(null)

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
    setAccessToken(accessTokenResponseJson.token)
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
      <button onClick={() => console.log("access token: " + accessToken)}>
        log token
      </button>
      {!loading &&
        data != null &&
        Object.entries(data).map((entry, i) => (
          <pre key={i}>
            <code>{JSON.stringify(entry[1], null, 2)}</code>
          </pre>
        ))}
    </div>
  )
}
export default Accounts
