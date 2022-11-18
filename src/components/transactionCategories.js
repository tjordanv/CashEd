import Grid from "@mui/material/Grid"

import TransactionCategory from "./transactionCategory"

const TransactionCategories = () => {
  return (
    <Grid container spacing={1}>
      <Grid className="Grid" xs={4}>
        <TransactionCategory category={{ name: "Income", ID: 1 }} />
      </Grid>
      <Grid className="Grid" xs={4}>
        <TransactionCategory category={{ name: "Savings & Investments", ID: 3 }} />
      </Grid>
      <Grid className="Grid" xs={4}>
        <TransactionCategory category={{ name: "Fixed Expenditures", ID: 4 }} />
      </Grid>
      <Grid className="Grid" xs={4}>
        <TransactionCategory category={{ name: "Savings & Investments", ID: 2 }} />
      </Grid>
    </Grid>
  )
}

export default TransactionCategories
