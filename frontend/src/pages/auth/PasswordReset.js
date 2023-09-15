import PasswordResetForm from "../../components/Authentication/PasswordResetForm"
import Box from "@mui/material/Box"
import classes from "./Auth.module.css"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import footer from "../../assets/AuthFooter.png"

const PasswordReset = () => {
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader pageTitle={"Password Reset"} />
        <PasswordResetForm />
        <AuthFormFooter type="password reset" />
      </Box>
      <img alt="footer" src={footer} className={classes.footer} />
    </div>
  )
}

export default PasswordReset
