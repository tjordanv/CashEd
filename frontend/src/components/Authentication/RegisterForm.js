import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import classes from "./Auth.module.css"
import FetchError from "../HelperComponents/FetchError"
import ErrorMessage from "../HelperComponents/ErrorMessage"
import InputError from "../HelperComponents/InputError"
import PasswordInput, { validatePassword } from "./PasswordInput"
import UsernameInput, { validateUsername } from "./UsernameInput"
import EmailInput from "./EmailInput"
import NameInput, { validateName } from "./NameInput"

const RegisterForm = ({ setUserHandler, formSection, setFormSection }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    emailAddress: { isError: false, message: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" },
    username: { isError: false, message: "" },
    firstName: { isError: false, message: "" },
    lastName: { isError: false, message: "" }
  })
  let errorList = []

  const setErrorHandler = (error) => {
    setErrors((prevState) => ({
      ...prevState,
      [error.inputField]: { isError: error.isError, message: error.message }
    }))
  }
  const resetErrors = () => {
    // reset any previous errors upon resubmission
    const tempErrors = { ...errors }
    for (const errorKey in tempErrors) {
      tempErrors[errorKey] = {
        isError: false,
        message: ""
      }
    }
    setErrors(tempErrors)
  }

  const registerHandlerPartOne = async (e) => {
    resetErrors()

    try {
      // Validate password criteria
      if (!validatePassword(password)) {
        errorList.push(
          new InputError(
            "Password must contain at least one uppercase, one number, one special character (@$!%*?&) and be at least 8 characters long.",
            "password"
          )
        )
      }
      // Check that password and confirm password match
      if (password !== confirmPassword) {
        errorList.push(
          new InputError("Passwords must match.", "confirmPassword")
        )
      }
      // Check that the provided email address is available.
      let emailAvailabilityResponse = await fetch(
        `http://localhost:8080/auth/checkEmailAvailability?${new URLSearchParams(
          {
            email: emailAddress
          }
        )}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!emailAvailabilityResponse.ok) {
        throw await FetchError.fromResponse(emailAvailabilityResponse)
      } else if (emailAvailabilityResponse.status === 200) {
        const emailAvailabilityResponseJson =
          await emailAvailabilityResponse.json()

        if (emailAvailabilityResponseJson === true) {
          errorList.push(
            new InputError("Email address already taken.", "emailAddress")
          )
        }
      }
      // Handle any input errors
      if (errorList.length > 0) {
        errorList.forEach((error) => {
          setErrorHandler({
            inputField: error.getInputName(),
            isError: true,
            message: error.getMessage()
          })
        })
        throw new InputError()
      } else {
        // If no input errors, send user to registration part 2
        setFormSection("register two")
      }
    } catch (error) {
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }

  const registerHandlerPartTwo = async (e) => {
    e.preventDefault()
    resetErrors()

    try {
      // validate first and last name
      if (!validateName(firstName)) {
        errorList.push(
          new InputError("First name can only contain letters", "firstName")
        )
      }
      if (!validateName(lastName)) {
        errorList.push(
          new InputError("Last name can only contain letters", "lastName")
        )
      }
      // validate username
      if (!validateUsername(username)) {
        errorList.push(
          new InputError(
            "Username must be between 4 and 15 characters. The only valid special characters are (., _, -).",
            "username"
          )
        )
      } else {
        // once username is validated, check that it is available
        let usernameAvailabilityResponse = await fetch(
          `http://localhost:8080/auth/checkUsernameAvailability?${new URLSearchParams(
            { username: username }
          )}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        if (!usernameAvailabilityResponse.ok) {
          throw await FetchError.fromResponse(usernameAvailabilityResponse)
        } else if (usernameAvailabilityResponse.status === 200) {
          const usernameAvailabilityResponseJson =
            await usernameAvailabilityResponse.json()

          if (usernameAvailabilityResponseJson === true) {
            errorList.push(
              new InputError("Username already taken.", "username")
            )
          }
        }
      }

      // Handle any input errors before attempting to register user
      if (errorList.length > 0) {
        errorList.forEach((error) => {
          setErrorHandler({
            inputField: error.getInputName(),
            isError: true,
            message: error.getMessage()
          })
        })
        throw new InputError()
      }

      const registerResponse = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: emailAddress,
            password: password,
            confirmPassword: confirmPassword,
            role: "USER"
          })
        }
      )
      if (!registerResponse.ok) {
        throw await FetchError.fromResponse(registerResponse)
      } else if (registerResponse.status === 200) {
        const registerResponseJson = await registerResponse.json()
        localStorage.setItem("jwt", registerResponseJson.accessToken)
        // Set the user information so the securityQandA component has the necessary information
        setUserHandler({
          id: registerResponseJson.id,
          username: registerResponseJson.username,
          email: registerResponseJson.email
        })
        setFormSection("registration security questions")
      }
    } catch (error) {
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }
  return (
    <form className={classes.form} onSubmit={registerHandlerPartTwo}>
      <Box className={classes.container}>
        {formSection === "register one" && (
          <>
            <EmailInput
              email={emailAddress}
              setEmailHandler={setEmailAddress}
              error={errors.emailAddress}
            />
            <PasswordInput
              password={password}
              inputHandler={setPassword}
              error={errors.password}
            />
            <PasswordInput
              password={confirmPassword}
              inputHandler={setConfirmPassword}
              error={errors.confirmPassword}
              isConfirmation={true}
            />
            <Button
              onClick={registerHandlerPartOne}
              variant="contained"
              className={classes.button}
            >
              Next
            </Button>
          </>
        )}
        {formSection === "register two" && (
          <>
            <UsernameInput
              username={username}
              setUsernameHandler={setUsername}
              error={errors.username}
            />
            <NameInput
              name={firstName}
              setNameHandler={setFirstName}
              error={errors.firstName}
            />
            <NameInput
              name={lastName}
              setNameHandler={setLastName}
              error={errors.lastName}
              isLastName={true}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Create Account
            </Button>
          </>
        )}
        {message && <ErrorMessage message={message} />}
      </Box>
    </form>
  )
}

export default RegisterForm
