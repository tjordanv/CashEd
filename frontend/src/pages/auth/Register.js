import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"

const Register = () => {
  const [user, setUser] = useState("")
  const [activeSecurityQuestions, setActiveSecurityQuestions] = useState(0)

  const navigate = useNavigate()

  const setActiveSecurityQuestionsHandler = () => {
    setActiveSecurityQuestions((prevCount) => prevCount + 1)
  }

  useEffect(() => {
    if (activeSecurityQuestions === 3) navigate("/")
  })

  return (
    <>
      {!user && <RegisterForm setUserHandler={setUser} />}
      {user && (
        <>
          {" "}
          <p>
            For additional security and user recovery, please answer 3 security
            questions
          </p>
          <p>{activeSecurityQuestions} / 3</p>
          <SecurityQandA
            type="register"
            user={user}
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
