import { Stack } from "@mui/material"
import AccountCard from "./AccountCard"

/**
 * The container that renders the user's active bank accounts
 * @param {Array} accounts array of the users active account objects
 * @param {function} removeAccountHandler the handler for deleting an account. This function gets passed into each account
 * @param {function} saveAccountHandler the handler for saving an account. This function gets passed into each account
 */
const AccountCardsList = ({
  accounts,
  removeAccountHandler,
  saveAccountHandler
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
              saveAccountHandler={saveAccountHandler}
            />
          ))}
        </Stack>
      )}
    </>
  )
}
export default AccountCardsList
