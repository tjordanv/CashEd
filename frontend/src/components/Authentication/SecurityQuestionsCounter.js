import Typography from "@mui/material/Typography"
import classes from "./SecurityQuestionsCounter.module.css"
const SecurityQuestionsCounter = ({ count }) => {
  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.count}>
        {count} / 3
      </Typography>
    </div>
  )
}

export default SecurityQuestionsCounter
