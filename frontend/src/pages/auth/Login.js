import Box from "@mui/material/Box"
import FormHeader from "../../components/auth/FormHeader"
import LoginForm from "../../components/auth/LoginForm"
import classes from "./Auth.module.css"

const Login = () => {
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Log In"} />
      <LoginForm />
    </Box>
  )
}

export default Login
