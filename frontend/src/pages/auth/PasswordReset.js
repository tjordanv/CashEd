import PasswordResetForm from "../../components/authentication/PasswordResetForm"
import Box from "@mui/material/Box"
import classes from "./Auth.module.css"
import FormHeader from "../../components/authentication/FormHeader"
import FormFooter from "../../components/authentication/FormFooter"
import RequestResponse from "../../components/authentication/RequestResponse"
import { useState } from "react"

const PasswordReset = () => {
  const [isReset, setIsReset] = useState(false)
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Password Reset"} />
      {(isReset && <RequestResponse type="password reset" />) || (
        <PasswordResetForm setIsResetHandler={setIsReset} />
      )}
      <FormFooter
        type="password reset"
        formSection={isReset ? "user recovery response" : ""}
      />
    </Box>
  )
}

export default PasswordReset
