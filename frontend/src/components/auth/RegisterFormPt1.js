import { useState } from "react"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import { setError, resetErrors, InputError } from "../../utils/inputErrors"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import PasswordInput, {
  validatePassword
} from "../../uiComponents/PasswordInput"
import EmailInput from "../../uiComponents/EmailInput"
import FormButton from "../../uiComponents/FormButton"

import FormFooter from "./FormFooter"

/**
 * The first part of the user registration process. Prompts the user to provide an email and password,
 *  confirming that the email is available before moving on.
 * @param {function} submitHandler the function to execute when the form is submitted. This allows the data to be given back to the parent.
 * @param {object} user the user object, used to communicate form data between portions of the registration process.
 */
const RegisterFormPt1 = ({ submitHandler, user }) => {
  const [emailAddress, setEmailAddress] = useState(user.emailAddress)
  const [password, setPassword] = useState(user.password)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    emailAddress: { isError: false, message: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" }
  })
  let errorList = []

  const formSubmissionHandler = async (e) => {
    e.preventDefault()
    resetErrors(errors, setErrors)

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
          setError(
            {
              inputField: error.getInputName(),
              isError: true,
              message: error.getMessage()
            },
            setErrors
          )
        })
        throw new InputError()
      }
      // submit the state to the parent component if all checks pass
      else {
        submitHandler({
          emailAddress: emailAddress,
          password: password,
          isPartTwo: true
        })
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

  const footerLink = {
    to: "/login",
    text: "Login",
    label: "Already have an account?"
  }

  return (
    <>
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
        <FormButton label="Next" type="submit" />
        {message && <ErrorMessage message={message} />}
      </form>
      <FormFooter topLink={footerLink} />
    </>
  )
}

export default RegisterFormPt1
