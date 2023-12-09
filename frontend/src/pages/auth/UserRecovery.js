import { useState } from "react"
import UserLookup from "../../components/authentication/UserLookup"
import SecurityQAndA from "../../components/authentication/SecurityQandA"
import RequestResponse from "../../components/authentication/RequestResponse"
import classes from "./Auth.module.css"
import FormFooter from "../../components/authentication/FormFooter"
import FormHeader from "../../components/authentication/FormHeader"
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
      <FormHeader
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
      {/* <FormFooter
        type={isPasswordReset ? "forgot password" : "forgot username"}
        formSection={
          isAuthenticated
            ? "user recovery response"
            : user
            ? "recovery security questions"
            : ""
        }
      /> */}
    </Box>
  )
}

export default UserRecovery
