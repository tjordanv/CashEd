import { useState } from "react"
import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false)

  const setIsRegisteredHandler = () => {
    setIsRegistered(true)
  }

  return (
    <>
      {(!isRegistered && (
        <RegisterForm setIsRegisteredHandler={setIsRegisteredHandler} />
      )) || (
        <>
          {" "}
          <p>
            For additional security and user recovery, please answer 3 security
            questions
          </p>
          <p>1/3</p>
          <SecurityQandA type="register" />{" "}
        </>
      )}
    </>
  )
}

export default Register
