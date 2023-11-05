import React, { useCallback, useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import fetcher from "../components/HelperFunctions/fetchAuthorize"
import { Box, Stack } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import AccountCard from "../components/AccountCard"
import FetchError from "../components/HelperComponents/FetchError"

const AccountCardsList = ({
  accounts,
  removeAccountHandler,
  updateNicknameHandler
}) => {
  return (
    <>
      {accounts && (
        <Stack spacing={2}>
          {accounts.map((account) => (
            <AccountCard
              key={account.accountId}
              account={account}
              removeAccountHandler={removeAccountHandler}
              updateNicknameHandler={updateNicknameHandler}
            />
          ))}
        </Stack>
      )}
    </>
  )
}
export default AccountCardsList
