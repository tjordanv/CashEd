import Box from "@mui/material/Box"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import LoginForm from "../../components/Authentication/LoginForm"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import classes from "./Auth.module.css"

const Login = () => {
  return (
    <Box className={classes.container}>
      <AuthFormHeader pageTitle={"Log In"} />
      <LoginForm />
      <AuthFormFooter type="login" />
    </Box>
  )
}

export default Login
