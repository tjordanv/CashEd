import { useState } from "react"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import { setError, resetErrors, InputError } from "../../utils/inputErrors"
import UsernameInput, {
  checkUsernameAvailability,
  validateUsername
} from "../../uiComponents/UsernameInput"
import NameInput, { validateName } from "../../uiComponents/NameInput"
import FormButton from "../../uiComponents/FormButton"
import FormFooter from "./FormFooter"

/**
 * @description The second part of the user registration process. Prompts the user to provide a username, first, and last name; confirming that the username is available before moving on.
 * @param {function} backHandler - the function that powers the back button in the footer. This ensures the data on pt 1 is updated
 * @param {function} submitHandler - the function to execute when the form is submitted. This allows the data to be given back to the parent.
 * @param {object} user - the user object, used to communicate form data between portions of the registration process.
 * @param {string} user.username - the user's username
 * @param {string} user.firstName - the user's first name
 * @param {string} user.lastName - the user's last name
 * @example <RegisterFormPt2 backHandler={backHandler} submitHandler={submitHandler} user={user} />
 * @returns {JSX.Element} the second part of the user registration process.
 */
const RegisterFormPt2 = ({ backHandler, submitHandler, user }) => {
  const [username, setUsername] = useState(user.username)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    username: { isError: false, message: "" },
    firstName: { isError: false, message: "" },
    lastName: { isError: false, message: "" }
  })
  let errorList = []

  const formSubmissionHandler = async (e) => {
    e.preventDefault()
    resetErrors(errors, setErrors)

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
        let isUsernameAvailable = await checkUsernameAvailability(username)
        if (!isUsernameAvailable) {
          errorList.push(new InputError("Username already taken.", "username"))
        }
      }

      // Handle any input errors before attempting to register user
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
      // create the user
      submitHandler(username, firstName, lastName)
    } catch (error) {
      if (error instanceof InputError) {
        // handle input error
      } else if (error instanceof FetchError) {
        setMessage(error.message)
      }
    }
  }
  const footerLink = {
    // update the user object with the current state of the form before going back to pt 1
    onClick: () =>
      backHandler({
        isPartTwo: false,
        username: username,
        firstName: firstName,
        lastName: lastName
      }),
    text: "Back"
  }
  return (
    <>
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
      <FormFooter topLink={footerLink} />
    </>
  )
}

export default RegisterFormPt2
