import { useState } from "react"
import UserLookup from "../../components/Authentication/UserLookup"
import SecurityQAndA from "../../components/Authentication/SecurityQandA"
import RequestResponse from "../../components/Authentication/RequestResponse"
import classes from "./Auth.module.css"
import AuthFormFooter from "../../components/Authentication/AuthFormFooter"
import AuthFormHeader from "../../components/Authentication/AuthFormHeader"
import Box from "@mui/material/Box"

const UserRecovery = ({ isPasswordReset }) => {
  const [user, setUser] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setUserHandler = (newValue) => {
    setUser(newValue)
  }

  const setIsAuthenticatedHandler = () => {
    setIsAuthenticated(true)
  }

  return (
    <Box className={classes.container}>
      <AuthFormHeader
        pageTitle={isPasswordReset ? "Forgot Password" : "Forgot Username"}
      />
      {!user && (
        <UserLookup
          setUserHandler={setUserHandler}
          isPasswordReset={isPasswordReset}
        />
      )}
      {user && !isAuthenticated && (
        <SecurityQAndA
          user={user}
          setIsAuthenticatedHandler={setIsAuthenticatedHandler}
          type={isPasswordReset ? "forgot password" : "forgot username"}
        />
      )}
      {isAuthenticated && <RequestResponse type="user recovery" />}
      <AuthFormFooter
        type={isPasswordReset ? "forgot password" : "forgot username"}
        formSection={
          isAuthenticated
            ? "user recovery response"
            : user
            ? "recovery security questions"
            : ""
        }
      />
    </Box>
  )
}

export default UserRecovery
