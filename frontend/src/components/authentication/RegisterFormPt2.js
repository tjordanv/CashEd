import { useState } from "react"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import InputError from "../../utils/inputError"
import UsernameInput, {
  validateUsername
} from "../../uiComponents/UsernameInput"
import NameInput, { validateName } from "../../uiComponents/NameInput"
import FormButton from "../../uiComponents/FormButton"

const RegisterForm = ({ submitHandler }) => {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
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

  const formSubmissionHandler = async (e) => {
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

      submitHandler(username, firstName, lastName)
    } catch (error) {
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }
  return (
    <form className={classes.container} onSubmit={formSubmissionHandler}>
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
      <FormButton label="Create Account" type="submit" />
      {message && <ErrorMessage message={message} />}
    </form>
  )
}

export default RegisterForm