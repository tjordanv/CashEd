import { useState } from "react"
import RegisterForm from "../../components/Authentication/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"

const Register = () => {
  const [user, setUser] = useState("")
  /* This controls which part, if any, of the form and footer will show when on the register page
  When setting the state, pass in whichever page/part you are navigating to. 
  Example: using the BACK link to go back to part one -> setRegistrationPart("one") */
  const [registrationPart, setRegistrationPart] = useState("one")

  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader />
        {!user && (
          <RegisterForm
            setUserHandler={setUser}
            registrationPart={registrationPart}
            setRegistrationPart={setRegistrationPart}
          />
        )}
        {user && (
          <>
            <SecurityQandA type="register" user={user} />{" "}
          </>
        )}
        <AuthFormFooter
          isRegistration={true}
          registrationPart={registrationPart}
          setRegistrationPart={setRegistrationPart}
        />
      </Box>
    </div>
  )
}

export default Register
