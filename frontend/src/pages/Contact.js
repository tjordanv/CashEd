import EmailInput from "../components/Authentication/EmailInput"
import { useState } from "react"
import NameInput from "../components/Authentication/NameInput"
import Box from "@mui/material/Box"
import ErrorMessage from "../components/HelperComponents/ErrorMessage"
import classes from "./Contact.module.css"
import MessageInput from "../components/Authentication/MessageInput"
import SubmitButton from "../components/Authentication/SubmitButton"

const Contact = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const test = (e) => {
    e.preventDefault()
    console.log(firstName)
  }
  return (
    <Box className={classes.wrapper}>
      <form onSubmit={test} className={classes.form}>
        <Box className={classes.container}>
          <NameInput name={firstName} setNameHandler={setFirstName} />
          <NameInput
            name={lastName}
            setNameHandler={setLastName}
            isLastName={true}
          />
          <EmailInput email={emailAddress} setEmailHandler={setEmailAddress} />
          <MessageInput message={message} setMessageHandler={setMessage} />
          <SubmitButton />
        </Box>
      </form>
      <ErrorMessage message={errorMessage} />
    </Box>
  )
}

export default Contact
