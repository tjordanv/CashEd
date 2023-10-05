import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import EmailInput from "../components/Authentication/EmailInput"
import { useState } from "react"
import NameInput from "../components/Authentication/NameInput"
import Box from "@mui/material/Box"
import ErrorMessage from "../components/HelperComponents/ErrorMessage"
import classes from "./Contact.module.css"

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
          <TextField
            multiline
            rows={5}
            required
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      <ErrorMessage message={errorMessage} />
    </Box>
  )
}

export default Contact
