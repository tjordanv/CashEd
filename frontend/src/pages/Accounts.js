import React, { useCallback, useEffect, useReducer, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../utils/fetchAuthorize"
import { Box, Chip, Divider, IconButton, List, Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import FetchError from "../utils/fetchError"
import AccountCardsList from "../components/accounts/AccountCardsList"
import classes from "./Accounts.module.css"
import AddCircleIcon from "@mui/icons-material/AddCircle"

// loads the user's accounts from the database
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

  const accountsReducer = (state, action) => {
    let tempAccounts
    switch (action.type) {
      case "new accounts":
        return {
          accounts: [...state.accounts, ...state.newAccounts],
          newAccounts: action.payload
        }
      case "delete account":
        tempAccounts = state.newAccounts.filter(
          (account) => account.id !== action.payload
        )
        // if nothing was filtered out, then the account was not in the newAccounts array but rather the accounts array.
        if (tempAccounts.length === state.newAccounts.length) {
          tempAccounts = state.accounts.filter(
            (account) => account.id !== action.payload
          )
          return { ...state, accounts: tempAccounts }
        } else {
          return { ...state, newAccounts: tempAccounts }
        }
      case "save account":
        tempAccounts = state.newAccounts
        let isAccountFound = tempAccounts.some((account) => {
          if (account.id === action.payload.id) {
            account.nickname = action.payload.nickname
            return true
          }
          return false
        })
        if (isAccountFound) {
          return { ...state, newAccounts: tempAccounts }
        }

        tempAccounts = state.accounts
        isAccountFound = tempAccounts.some((account) => {
          if (account.id === action.payload.id) {
            account.nickname = action.payload.nickname
            return true
          }
          return false
        })
        if (isAccountFound) {
          return { ...state, accounts: tempAccounts }
        }
        break
      default:
        return state
    }
  }

  const [accountsState, dispatch] = useReducer(accountsReducer, {
    accounts: useLoaderData(),
    newAccounts: []
  })

  // saves the nickname of an account to the database
  const saveAccountHandler = async (id, nickname) => {
    // handles making the api request to save the account
    const saveAccount = async (id, nickname) => {
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
          // update the accounts state
          dispatch({
            type: "save account",
            payload: { id: id, nickname: nickname }
          })
          return true
        }
      }
    }
    let isAccountFound = accountsState.newAccounts.some((account) => {
      if (account.id === id) {
        saveAccount(id, nickname)
        return true
      }
      return false
    })
    if (isAccountFound) {
      return
    } else {
      isAccountFound = accountsState.accounts.some((account) => {
        if (account.id === id) {
          saveAccount(id, nickname)
          return true
        }
        return false
      })
      if (isAccountFound) {
        return
      }
    }

    // const checkAccounts = async (accountsArray, setAccountHandler) => {
    //   if (!accountsArray) return false

    //   let tempAccounts = accountsArray
    //   for (let i = 0; i < tempAccounts.length; i++) {
    //     if (tempAccounts[i].id === id) {
    //       tempAccounts[i].nickname = nickname
    //       // make api request to save updated account
    //       const response = await fetcher(
    //         `http://localhost:8080/updateAccount?${new URLSearchParams({
    //           id: id,
    //           nickname: nickname
    //         })}`,
    //         {
    //           method: "PUT",
    //           mode: "cors",
    //           headers: { "Content-Type": "application/json" }
    //         }
    //       )
    //       if (!response.ok) {
    //         throw new FetchError.fromResponse(response)
    //       } else if (response.status === 200) {
    //         if (!response.json()) {
    //           throw new Error("Account not updated")
    //         } else {
    //           setAccountHandler(tempAccounts)
    //           return true
    //         }
    //       }
    //     }
    //   }
    //   return false
    // }

    // if (await checkAccounts(newAccounts, setNewAccounts)) {
    //   return
    // } else {
    //   await checkAccounts(accounts, setAccounts)
    // }
  }

  // handles "removing" an account from the database. The account is not actually removed, but is instead is_deleted is set to true
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
          dispatch({ type: "delete account", payload: id })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // exchanges and stores the public token for an access token and new account information when the user successfully completes the Plaid Link flow
  const onSuccess = useCallback(async (publicToken, metadata) => {
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
    if (!accessTokenResponse.ok) {
      throw new FetchError.fromResponse(accessTokenResponse)
    } else {
      const accessTokenResponseJson = await accessTokenResponse.json()
      dispatch({ type: "new accounts", payload: accessTokenResponseJson })
    }
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

  // configures the Plaid Link modal
  const config = {
    onSuccess: onSuccess,
    token: token,
    onExit: (error, metadata) => {
      console.log(error)
      console.log(metadata)
    }
  }
  const { open, ready } = usePlaidLink(config)

  // creates a link token when the component mounts. This is necessary because the token is only valid for a short period and is required to open the Plaid Link modal
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
      <button
        onClick={() =>
          console.log(accountsState.accounts, accountsState.newAccounts)
        }
      >
        test
      </button>
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
          {accountsState.newAccounts.length > 0 && (
            <Box>
              <Divider sx={{ width: "500px", margin: "5px" }}>
                <Chip label="NEW" />
              </Divider>
            </Box>
          )}
          <AccountCardsList
            accounts={accountsState.newAccounts}
            removeAccountHandler={removeAccountHandler}
            saveAccountHandler={saveAccountHandler}
          />
          {accountsState.newAccounts.length > 0 && (
            <Divider sx={{ width: "500px", margin: "20px" }} />
          )}
          <AccountCardsList
            accounts={accountsState.accounts}
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
