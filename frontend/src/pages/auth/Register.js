import { useState } from "react"
import RegisterFormPt1 from "../../components/auth/RegisterFormPt1"
import RegisterFormPt2 from "../../components/auth/RegisterFormPt2"
import SecurityQandA from "../../components/auth/SecurityQandA"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import FormHeader from "../../components/auth/FormHeader"
import FetchError from "../../utils/fetchError"

const Register = () => {
  const [user, setUser] = useState({
    isPartTwo: false,
    id: "",
    emailAddress: "",
    password: "",
    username: "",
    firstName: "",
    lastName: ""
  })
  const setUserHandler = (updates) => {
    setUser((prevState) => ({
      ...prevState,
      ...updates
    }))
  }

  // This function is used to create the user in the database
  const createUser = async (username, firstName, lastName) => {
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
        id: responseJson.user.id,
        username: responseJson.user.username
      })
    }
  }

  // This component is used to switch between the two registration forms
  const Component = () => {
    let comp = <RegisterFormPt1 submitHandler={setUserHandler} user={user} />

    if (user.id) {
      comp = <SecurityQandA type="register" />
    } else if (user.isPartTwo) {
      comp = (
        <RegisterFormPt2
          backHandler={setUserHandler}
          submitHandler={createUser}
          user={user}
        />
      )
    }

    return comp
  }

  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Registration"} />
      <Component />
    </Box>
  )
}

export default Register
