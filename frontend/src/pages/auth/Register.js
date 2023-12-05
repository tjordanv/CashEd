import { useState } from "react"
import RegisterForm from "../../components/authentication/RegisterForm"
import SecurityQandA from "../../components/authentication/SecurityQandA"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import FormHeader from "../../components/authentication/FormHeader"
import FormFooter from "../../components/authentication/FormFooter"
import FetchError from "../../utils/fetchError"

const Register = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    username: ""
  })
  const setUserHandler = (updates) => {
    setUser((prevState) => ({
      ...prevState,
      ...updates
    }))
  }
  /* This controls which part, if any, of the form and footer will show when on the register page
  When setting the state, pass in whichever page/part you are navigating to. 
  Example: using the BACK link to go back to part one -> setFormSection("one") */
  const [formSection, setFormSection] = useState("register one")

  const createUser = async ({ username, firstName, lastName }) => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: user.emailAddress,
        password: user.password,
        role: "USER"
      })
    })
    if (!response.ok) {
      throw await FetchError.fromResponse(response)
    } else if (response.status === 200) {
      const responseJson = await response.json()
      localStorage.setItem("jwt", responseJson.accessToken)
      // Set the user information so the securityQandA component has the necessary information
      setUserHandler({
        id: responseJson.id,
        username: responseJson.username
      })
      setFormSection("registration security questions")
    }
  }

  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Registration"} />
      {!user && (
        <RegisterForm
          setUserHandler={setUser}
          formSection={formSection}
          setFormSection={setFormSection}
        />
      )}
      {user && (
        <>
          <SecurityQandA type="register" user={user} />{" "}
        </>
      )}
      <FormFooter
        type="registration"
        formSection={formSection}
        setFormSection={setFormSection}
      />
    </Box>
  )
}

export default Register
