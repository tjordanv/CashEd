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
import InputError from "../utils/inputError"
import CircularProgress from "@mui/material/CircularProgress"

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
            throw new InputError()
          }
        }

        body.username = username
        stringifiedBody = JSON.stringify(body)
      } else {
        body.firstName = firstName
        body.lastName = lastName
        body.emailAddress = emailAddress

        stringifiedBody = JSON.stringify(body)
      }

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

  return (
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
          <EmailInput email={emailAddress} setEmailHandler={setEmailAddress} />
        </>
      )}
      <MessageInput message={message} setMessageHandler={setMessage} />
      {(isLoading && <CircularProgress className={classes.loader} />) || (
        <FormButton type="submit" />
      )}
      <ErrorMessage message={errorMessage} />
    </form>
  )
}

export default ContactForm
