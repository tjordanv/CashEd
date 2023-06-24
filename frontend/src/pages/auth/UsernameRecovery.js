import { useState } from "react"
import EmailLookup from "../../components/Authentication/userRecovery/EmailLookup"
import SecurityQAndA from "../../components/Authentication/userRecovery/SecurityQAndAContainer"
import FinalResponse from "../../components/Authentication/userRecovery/FinalResponse"

const UsernameRecovery = () => {
  const [userId, setUserId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setUserIdHandler = (userId) => {
    setUserId(userId)
  }

  const setIsAuthenticatedHandler = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
      {!userId && <EmailLookup setUserIdHandler={setUserIdHandler} />}
      {userId && !isAuthenticated && (
        <SecurityQAndA
          userId={userId}
          setIsAuthenticatedHandler={setIsAuthenticatedHandler}
        />
      )}
      {isAuthenticated && <FinalResponse />}
    </>
  )
}

export default UsernameRecovery
