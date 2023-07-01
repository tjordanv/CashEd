import SecurityQuestions from "./SecurityQuestions"
import SecurityAnswer from "./SecurityAnswer"

import classes from "./Auth.module.css"

import Box from "@mui/material/Box"

const RegisterSecurityQandA = () => {
  return (
    <form className={classes.form}>
      <Box className={classes.container}>
        <SecurityQuestions />
        <SecurityAnswer error={{ isError: false, message: "" }} />
      </Box>
    </form>
  )
}
export default RegisterSecurityQandA
