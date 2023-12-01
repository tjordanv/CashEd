import Box from "@mui/material/Box"
import FormHeader from "../../components/authentication/FormHeader"
import LoginForm from "../../components/authentication/LoginForm"
import FormFooter from "../../components/authentication/FormFooter"
import classes from "./Auth.module.css"

const Login = () => {
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Log In"} />
      <LoginForm />
      <FormFooter type="login" />
    </Box>
  )
}

export default Login
