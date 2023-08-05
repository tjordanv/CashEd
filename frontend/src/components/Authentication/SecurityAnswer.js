import TextField from "@mui/material/TextField"
import classes from "./Auth.module.css"
import InputAdornment from "@mui/material/InputAdornment"

const SecurityQuestionAnswer = ({ answer, setAnswerHandler, error }) => {
  return (
    <TextField
      required
      value={answer}
      label={"Answer"}
      onChange={(e) => setAnswerHandler(e.target.value)}
      className={classes.inputField}
      multiline
      rows={2}
      error={error.isError}
      helperText={error.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {`${answer.length}/${40}`}
          </InputAdornment>
        )
      }}
      inputProps={{ maxLength: 40 }}
    />
  )
}

SecurityQuestionAnswer.defaultProps = {
  error: { isError: false, message: "" }
}

export default SecurityQuestionAnswer
