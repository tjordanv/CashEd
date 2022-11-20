import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/system"

import TransactionCategory from "./transactionCategory"

const TransactionCategories = () => {
  const GridContainerd = styled(Box)(({ theme }) => ({
    MinWidth: "455px"
  }))

  return (
    <Box sx={{ minWidth: 455 }}>
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
    </Box>
  )
}

export default TransactionCategories
