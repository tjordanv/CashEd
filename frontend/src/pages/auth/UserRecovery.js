import { useState } from "react"
import UserLookup from "../../components/Authentication/UserLookup"
import SecurityQAndA from "../../components/Authentication/SecurityQandA"
import UserRecoveryResponse from "../../components/Authentication/UserRecoveryResponse"
import classes from "./Auth.module.css"
import footer from "../../assets/AuthFooter.png"
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
    <div className={classes.wrapper}>
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
        {isAuthenticated && <UserRecoveryResponse />}
        <AuthFormFooter
          type={isPasswordReset ? "forgot password" : "forgot username"}
          formSection={
            user
              ? "recovery security questions"
              : isAuthenticated
              ? "user recovery response"
              : ""
          }
        />
      </Box>
      <img alt="footer" src={footer} className={classes.footer} />
    </div>
  )
}

export default UserRecovery
