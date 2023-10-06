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

  const submitFormHandler = (e) => {
    e.preventDefault()
    console.log(firstName)
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
