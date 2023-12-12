import EmailInput from "../uiComponents/EmailInput"
import { useState } from "react"
import NameInput from "../uiComponents/NameInput"
import UsernameInput from "../uiComponents/UsernameInput"
import ErrorMessage from "../uiComponents/ErrorMessage"
import classes from "./ContactForm.module.css"
import MessageInput from "../uiComponents/MessageInput"
import FormButton from "../uiComponents/FormButton"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FetchError from "../utils/fetchError"
import { InputError } from "../utils/inputErrors"
import CircularProgress from "@mui/material/CircularProgress"
import FormFooter from "./auth/FormFooter"

/**
 * @description The form on the contact page for users and non-users to contact us through
 * @param {function} setIsSubmitted - the react state setter function that will set the state of the parent component to true when the form is submitted successfully
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
const ContactForm = ({ setIsSubmitted }) => {
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState({ isError: false, message: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const setIsActiveUserHandler = () => {
    setIsActiveUser(!isActiveUser)
    setFirstName("")
    setLastName("")
    setUsername("")
  }

  const submitFormHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const body = { message: message, activeUser: isActiveUser }
    let stringifiedBody

    try {
      // set the request body appropriately for a user or non-user
      if (isActiveUser) {
        // confirm that the user exists
        const usernameResponse = await fetch(
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
        if (!usernameResponse.ok) {
          throw await FetchError.fromResponse(usernameResponse)
        } else {
          const usernameResponseJson = await usernameResponse.json()
          if (usernameResponseJson === false) {
            throw new InputError("user not found", "usernameInput")
          }
        }
        // insert username to the request body if the user is found.
        body.username = username
        stringifiedBody = JSON.stringify(body)
      } else {
        // insert contact info to the request body for non-user
        body.firstName = firstName
        body.lastName = lastName
        body.emailAddress = emailAddress

        stringifiedBody = JSON.stringify(body)
      }
      // send message to our server
      let response = await fetch("http://localhost:8080/auth/contactUs", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: stringifiedBody
      })
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      } else {
        const responseJson = await response.json()
        if (responseJson) {
          setIsSubmitted(true)
        } else {
          setIsLoading(false)
        }
      }
    } catch (error) {
      if (error instanceof FetchError) {
        setMessage(error.message)
      } else if (error instanceof InputError) {
        setError({ isError: true, message: "Username not found." })
      } else {
        console.log("caught an error")
      }
      setIsLoading(false)
    }
  }

  const footerData = {
    topLink: {
      to: "/login",
      text: "Cancel"
    },
    tooltip:
      "Submit your contact information with a short descriptive message and we will reach out to your email shortly."
  }

  return (
    <>
      <form onSubmit={submitFormHandler} className={classes.container}>
        <FormControlLabel
          control={
            <Checkbox value={isActiveUser} onChange={setIsActiveUserHandler} />
          }
          label="Active User?"
        />
        {(isActiveUser && (
          <UsernameInput
            username={username}
            setUsernameHandler={setUsername}
            error={error}
          />
        )) || (
          <>
            <NameInput name={firstName} setNameHandler={setFirstName} />
            <NameInput
              name={lastName}
              setNameHandler={setLastName}
              isLastName={true}
            />
            <EmailInput
              email={emailAddress}
              setEmailHandler={setEmailAddress}
            />
          </>
        )}
        <MessageInput message={message} setMessageHandler={setMessage} />
        {(isLoading && <CircularProgress className={classes.loader} />) || (
          <FormButton type="submit" />
        )}
        <ErrorMessage message={errorMessage} />
      </form>
      <FormFooter topLink={footerData.topLink} tooltip={footerData.tooltip} />
    </>
  )
}

export default ContactForm
