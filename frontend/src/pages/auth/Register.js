import { useState } from "react"
import RegisterForm from "../../components/Authentication/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"

const Register = () => {
  const [user, setUser] = useState("")

  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <AuthFormHeader />
        {!user && <RegisterForm setUserHandler={setUser} />}
        {user && (
          <>
            <SecurityQandA type="register" user={user} />{" "}
          </>
        )}
      </Box>
    </div>
  )
}

export default Register
