import { useState } from "react"
import UserLookup from "../../components/Authentication/UserLookup"
import SecurityQAndA from "../../components/Authentication/SecurityQandA"
import FinalResponse from "../../components/Authentication/userRecovery/FinalResponse"

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
    <>
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
          type={isPasswordReset ? "password reset" : "username recovery"}
        />
      )}
      {isAuthenticated && <FinalResponse />}
    </>
  )
}

export default UserRecovery
