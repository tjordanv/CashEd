import Grid from "@mui/material/Grid"
import { Box } from "@mui/system"

import TransactionCategory from "./transactionCategory"

const TransactionCategories = () => {
  // when using this styled Box, it seems to continually re-render
  return (
    // <GridContainer>
    <Box sx={{ minWidth: 455, margin: "24px 0 0 0 !important" }}>
      <Grid container spacing={0}>
        <Grid sx={{ height: "40vh" }} xs={4}>
          <TransactionCategory category={{ name: "Income", ID: 1 }} />
        </Grid>
        <Grid sx={{ height: "40vh" }} xs={4}>
          <TransactionCategory category={{ name: "Savings & Investments", ID: 3 }} />
        </Grid>
        <Grid sx={{ height: "40vh" }} xs={4}>
          <TransactionCategory category={{ name: "Fixed Expenditures", ID: 4 }} />
        </Grid>
        <Grid sx={{ height: "40vh" }} xs={4}>
          <TransactionCategory category={{ name: "Savings & Investments", ID: 2 }} />
        </Grid>
      </Grid>
    </Box>
    // </GridContainer>
  )
}

export default TransactionCategories
