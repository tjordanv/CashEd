import { useState } from "react"
import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import RegisterSecurityQuestions from "../../components/Authentication/userRegistration/RegisterSecurityQuestions"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(true)

  return (
    <>{(!isRegistered && <RegisterForm />) || <RegisterSecurityQuestions />}</>
  )
}

export default Register
