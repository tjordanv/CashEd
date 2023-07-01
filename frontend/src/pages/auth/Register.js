import { useState } from "react"
import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(true)

  return <>{(!isRegistered && <RegisterForm />) || <SecurityQandA />}</>
}

export default Register
