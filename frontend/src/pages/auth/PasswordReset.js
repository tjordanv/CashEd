import PasswordResetForm from "../../components/Authentication/PasswordResetForm"
import Box from "@mui/material/Box"
import classes from "./Auth.module.css"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import RequestResponse from "../../components/Authentication/RequestResponse"
import { useState } from "react"

const PasswordReset = () => {
  const [isReset, setIsReset] = useState(false)
  return (
    <Box className={classes.container}>
      <AuthFormHeader pageTitle={"Password Reset"} />
      {(isReset && <RequestResponse type="password reset" />) || (
        <PasswordResetForm setIsResetHandler={setIsReset} />
      )}
      <AuthFormFooter
        type="password reset"
        formSection={isReset ? "user recovery response" : ""}
      />
    </Box>
  )
}

export default PasswordReset
