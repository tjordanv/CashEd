import { useState } from "react"
import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import RegisterSecurityQandA from "../../components/Authentication/RegisterSecurityQandA"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(true)

  return <>{(!isRegistered && <RegisterForm />) || <RegisterSecurityQandA />}</>
}

export default Register
