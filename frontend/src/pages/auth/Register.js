import { useState } from "react"

import RegisterForm from "../../components/Authentication/userRegistration/RegisterForm"
import SecurityQandA from "../../components/Authentication/SecurityQandA"

const Register = () => {
  const [user, setUser] = useState("")

  return (
    <>
      {!user && <RegisterForm setUserHandler={setUser} />}
      {user && (
        <>
          <SecurityQandA type="register" user={user} />{" "}
        </>
      )}
    </>
  )
}

export default Register
