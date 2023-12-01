import { Stack } from "@mui/material"
import AccountCard from "./AccountCard"

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
