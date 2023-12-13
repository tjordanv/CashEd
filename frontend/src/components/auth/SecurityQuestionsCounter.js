import Typography from "@mui/material/Typography"
import classes from "./SecurityQuestionsCounter.module.css"

/**
 * Displays the number of active security questions the user has
 * @param {number} count the number of active security questions that the user has. This comes from the parent component's state
 */
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
