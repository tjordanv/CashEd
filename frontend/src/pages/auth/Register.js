import { useState } from "react"
import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeSecurityQuestions, setActiveSecurityQuestions] = useState(0)

  const setIsRegisteredHandler = () => {
    setIsRegistered(true)
  }

  const setActiveSecurityQuestionsHandler = () => {
    setActiveSecurityQuestions((prevCount) => prevCount + 1)
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
          <p>{activeSecurityQuestions} / 3</p>
          <SecurityQandA
            type="register"
            setActiveSecurityQuestionsHandler={
              setActiveSecurityQuestionsHandler
            }
          />{" "}
        </>
      )}
    </>
  )
}

export default Register
