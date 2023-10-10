import { redirect, useLoaderData, useNavigate } from "react-router-dom"

import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import Plaid from "react-plaid-link"
import FetchError from "./HelperComponents/FetchError"

import Button from "@mui/material/Button"
import fetcher from "./HelperFunctions/fetchAuthorize"

const DashboardTest = () => {
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null)

  const onSuccess = useCallback(async (publicToken, metadata) => {
    setLoading(true)
    const accessTokenResponse = await fetch(
      "http://localhost:8080/auth/exchangeToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ publicToken: publicToken })
      }
    )
    const accessTokenResponseJson = await accessTokenResponse.json()
    setAccessToken(accessTokenResponseJson.linkTkn)
  }, [])

  // Creates a Link token
  const createLinkToken = useCallback(async () => {
    const response = await fetch("http://localhost:8080/auth/createToken", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setToken(data.linkTkn)
    localStorage.setItem("link_token", data.linkTkn)
  }, [setToken])

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
      // if (ready && token) {
      //   console.log("ready")
      //   open()
      // }
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
export default DashboardTest
