import { useState } from "react"
import RegisterForm from "../../components/authentication/RegisterForm"
import SecurityQandA from "../../components/authentication/SecurityQandA"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import FormHeader from "../../components/authentication/FormHeader"
import FormFooter from "../../components/authentication/FormFooter"

const Register = () => {
  const [user, setUser] = useState("")
  /* This controls which part, if any, of the form and footer will show when on the register page
  When setting the state, pass in whichever page/part you are navigating to. 
  Example: using the BACK link to go back to part one -> setFormSection("one") */
  const [formSection, setFormSection] = useState("register one")

  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Registration"} />
      {!user && (
        <RegisterForm
          setUserHandler={setUser}
          formSection={formSection}
          setFormSection={setFormSection}
        />
      )}
      {user && (
        <>
          <SecurityQandA type="register" user={user} />{" "}
        </>
      )}
      <FormFooter
        type="registration"
        formSection={formSection}
        setFormSection={setFormSection}
      />
    </Box>
  )
}

export default Register
