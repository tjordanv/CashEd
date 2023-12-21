import { useState } from "react"
import classes from "./Auth.module.css"
import FetchError from "../../utils/fetchError"
import ErrorMessage from "../../uiComponents/ErrorMessage"
import EmailInput from "../../uiComponents/EmailInput"
import UsernameInput from "../../uiComponents/UsernameInput"
import FormButton from "../../uiComponents/FormButton"
import FormFooter from "./FormFooter"

/**
 * @description UserLookup component for user authentication.
 * @param {Function} setUserHandler - The function to handle user data.
 * @param {boolean} isPasswordReset - Flag indicating if it's a password reset.
 * @returns {JSX.Element} The rendered UserLookup component.
 */
const UserLookup = ({ setUserHandler, isPasswordReset }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState({
    email: { isError: false, message: "" },
    username: { isError: false, message: "" }
  })

  const getUserIdByEmail = async (e) => {
    e.preventDefault()

    let params = {
      emailAddress: emailAddress
    }
    if (isPasswordReset) params.username = username
    console.log(params)
    try {
      console.log("trying")
      // This API call will return 0 if the user is not found
      const response = await fetch(
        `http://localhost:8080/auth/getUserIdByEmailAndUsername?${new URLSearchParams(
          params
        )}`,
        {
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }
      )

      if (!response.ok) throw await FetchError.fromResponse(response)

      const userId = await response.json()
      if (userId !== 0) {
        setUserHandler({ id: userId, username: username, email: emailAddress })
      } else {
        let errorObject = {
          email: {
            isError: true,
            message: "Email not found."
          }
        }
        if (isPasswordReset) {
          errorObject.username = { isError: true, message: "User not found." }
          errorObject.email.message = ""
        }
        setErrors(errorObject)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  const footerData = {
    topLink: {
      to: `/userRecovery/forgot${isPasswordReset ? "username" : "password"}`,
      text: `Forgot ${isPasswordReset ? "username" : "password"}`
    },
    bottomLink: {
      to: "/login",
      text: "Cancel"
    },
    tooltip: isPasswordReset
      ? "Enter the username and email address associated to your account."
      : "Enter the email address associated to your account."
  }

  return (
    <>
      <form onSubmit={getUserIdByEmail} className={classes.container}>
        <EmailInput
          email={emailAddress}
          setEmailHandler={setEmailAddress}
          error={errors.email}
        />
        {isPasswordReset && (
          <UsernameInput
            username={username}
            setUsernameHandler={setUsername}
            error={errors.username}
          />
        )}
        <FormButton label="Next" type="submit" />
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </form>
      <FormFooter
        topLink={footerData.topLink}
        bottomLink={footerData.bottomLink}
        tooltip={footerData.tooltip}
      />
    </>
  )
}

export default UserLookup
