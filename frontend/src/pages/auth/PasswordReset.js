import PasswordResetForm from "../../components/auth/PasswordResetForm"
import Box from "@mui/material/Box"
import classes from "./Auth.module.css"
import FormHeader from "../../components/auth/FormHeader"
import RequestResponse from "../../components/auth/RequestResponse"
import { useState } from "react"

const PasswordReset = () => {
  const [isReset, setIsReset] = useState(false)
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Password Reset"} />
      {(isReset && <RequestResponse type="password reset" />) || (
        <PasswordResetForm setIsResetHandler={setIsReset} />
      )}
    </Box>
  )
}

export default PasswordReset
