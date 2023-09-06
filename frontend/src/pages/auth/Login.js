import Box from "@mui/material/Box"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import LoginForm from "../../components/Authentication/LoginForm"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import classes from "./Auth.module.css"

const Login = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader />
        <LoginForm />
        <AuthFormFooter />
      </Box>
    </div>
  )
}

export default Login
