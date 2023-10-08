import EmailInput from "../components/Authentication/EmailInput"
import { useState } from "react"
import NameInput from "../components/Authentication/NameInput"
import UsernameInput from "../components/Authentication/UsernameInput"
import ErrorMessage from "../components/HelperComponents/ErrorMessage"
import classes from "./ContactForm.module.css"
import MessageInput from "../components/Authentication/MessageInput"
import FormButton from "../components/Authentication/FormButton"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FetchError from "./HelperComponents/FetchError"

const ContactForm = () => {
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const setIsActiveUserHandler = () => {
    setIsActiveUser(!isActiveUser)
    setFirstName("")
    setLastName("")
    setUsername("")
  }

  const submitFormHandler = async (e) => {
    e.preventDefault()

    const body = { message: message, activeUser: isActiveUser }
    let stringifiedBody

    // set the request body appropriately for a user or non-user
    if (isActiveUser) {
      body.username = username
      stringifiedBody = JSON.stringify(body)
    } else {
      body.firstName = firstName
      body.lastName = lastName
      body.emailAddress = emailAddress

      stringifiedBody = JSON.stringify(body)
    }

    try {
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
          console.log("success")
        } else {
          console.log("failed to save")
        }
      }
    } catch (error) {
      if (error instanceof FetchError) {
        setMessage(error.message)
      } else {
        console.log("caught an error")
      }
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
        <UsernameInput username={username} setUsernameHandler={setUsername} />
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
      <FormButton type="submit" />
      <ErrorMessage message={errorMessage} />
    </form>
  )
}

export default ContactForm