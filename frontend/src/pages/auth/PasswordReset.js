import PasswordResetForm from "../../components/Authentication/PasswordResetForm"
import Box from "@mui/material/Box"
import classes from "./Auth.module.css"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import footer from "../../assets/AuthFooter.png"
import RecoveryResponse from "../../components/Authentication/RecoveryResponse"
import { useState } from "react"

const PasswordReset = () => {
  const [isReset, setIsReset] = useState(false)
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader pageTitle={"Password Reset"} />
        {(isReset && <RecoveryResponse isPasswordReset={isReset} />) || (
          <PasswordResetForm setIsResetHandler={setIsReset} />
        )}
        <AuthFormFooter
          type="password reset"
          formSection={isReset ? "user recovery response" : ""}
        />
      </Box>
      <img alt="footer" src={footer} className={classes.footer} />
    </div>
  )
}

export default PasswordReset
