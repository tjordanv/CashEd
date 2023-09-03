import Box from "@mui/material/Box"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import LoginForm from "../../components/Authentication/LoginForm"

import classes from "./Auth.module.css"

const Login = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader />
        <LoginForm />
      </Box>
    </div>
  )
}

export default Login
