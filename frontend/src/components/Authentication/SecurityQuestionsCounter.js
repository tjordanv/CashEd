import Typography from "@mui/material/Typography"
import classes from "./SecurityQuestionsCounter.module.css"
const SecurityQuestionsCounter = ({ count }) => {
  return (
    <div className={classes.container}>
      <Typography variant="body1" className={classes.header}>
        For additional security, please answer 3 security questions.
      </Typography>
      <Typography variant="h6" className={classes.count}>
        {count} / 3
      </Typography>
    </div>
  )
}

export default SecurityQuestionsCounter
