import classes from "./InputFields.module.css"
import Button from "@mui/material/Button"

const FormButton = ({ label, type, onClick, disabled }) => {
  return (
    <Button
      type={type}
      variant="contained"
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label || "Submit"}
    </Button>
  )
}

export default FormButton
