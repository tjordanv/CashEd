import Box from "@mui/material/Box"
import FormHeader from "../../components/auth/FormHeader"
import LoginForm from "../../components/auth/LoginForm"
import classes from "./Auth.module.css"

/**
 * @returns {JSX.Element} Login page
 */
const Login = () => {
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Log In"} />
      <LoginForm />
    </Box>
  )
}

export default Login
