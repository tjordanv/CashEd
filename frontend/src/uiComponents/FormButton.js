import classes from "./InputFields.module.css"
import Button from "@mui/material/Button"

/**
 *
 * @param {string} color - The name of the color object from the theme palette
 */
const FormButton = ({ label, type, onClick, disabled, color, size }) => {
  return (
    <Button
      size={size}
      color={color}
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
