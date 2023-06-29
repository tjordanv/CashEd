import Button from "@mui/material/Button"

import FetchError from "../../HelperComponents/FetchError"
import { useEffect, useState } from "react"

const RegisterSecurityQuestions = () => {
  const [securityQuestions, setSecurityQuestions] = useState()

  useEffect(() => {
    const getSecurityQuestions = async () => {
      let response = await fetch(
        "http://localhost:8080/auth/getSecurityQuestions"
      )

      if (!response.ok) {
        throw FetchError.fromResponse(response)
      } else {
        const responseJson = await response.json()
        setSecurityQuestions(responseJson)
      }
    }
    getSecurityQuestions()
  }, [])

  return (
    <>
      <p>hello world</p>
      <Button onClick={() => console.log(securityQuestions)}>test</Button>
    </>
  )
}

export default RegisterSecurityQuestions
