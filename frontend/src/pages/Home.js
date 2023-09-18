import Box from "@mui/material/Box"
import classes from "./auth/Auth.module.css"
import footer from "../assets/AuthFooter.png"
import Stack from "@mui/material/Stack"
import BarChartIcon from "@mui/icons-material/BarChart"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CreditScoreIcon from "@mui/icons-material/CreditScore"
import Typography from "@mui/material/Typography"

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.cont}>
        <div className={classes.titleCont}>
          <Typography variant="h4">Get to know your money.</Typography>
          <div></div>
          <div></div>
        </div>
        <Box className={classes.tempCont}>
          <Stack spacing={6}>
            <div className={classes.stackItem}>
              <CreditScoreIcon />
              <Typography variant="h5">
                Set and and and achieve budgets
              </Typography>
            </div>
            <div className={classes.stackItem}>
              <BarChartIcon />
              <Typography variant="h5">Set and achieve budgets</Typography>
            </div>
            <div className={classes.stackItem}>
              <CheckCircleIcon />
              <Typography variant="h5">Set achieve budgets</Typography>
            </div>
            <div className={classes.stackItem}>
              <CurrencyExchangeIcon />
              <Typography variant="h5">Set and and achieve budgets</Typography>
            </div>
          </Stack>
        </Box>
      </div>
      <img alt="footer" src={footer} className={classes.footer} />
    </div>
  )
}

export default Home
