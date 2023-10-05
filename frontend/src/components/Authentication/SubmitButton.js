import classes from "./InputFields.module.css"
import Button from "@mui/material/Button"

const SubmitButton = ({ label }) => {
  return (
    <Button type="submit" variant="contained" className={classes.button}>
      {label || "Submit"}
    </Button>
  )
}

export default SubmitButton
