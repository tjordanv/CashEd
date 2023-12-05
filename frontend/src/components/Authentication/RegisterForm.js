import { useState } from "react"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import InputError from "../../utils/inputError"
import PasswordInput, {
  validatePassword
} from "../../uiComponents/PasswordInput"
import EmailInput from "../../uiComponents/EmailInput"
import FormButton from "../../uiComponents/FormButton"

const RegisterForm = ({ submitHandler }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    emailAddress: { isError: false, message: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
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
      }
      // submit the state to the parent component if all checks pass
      else {
        submitHandler({ emailAddress: emailAddress, password: password })
      }
    } catch (error) {
      //console.log(error)
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }

  return (
    <form className={classes.container} onSubmit={formSubmissionHandler}>
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
      <FormButton label="Next" onClick={formSubmissionHandler} />
      {message && <ErrorMessage message={message} />}
    </form>
  )
}

export default RegisterForm
