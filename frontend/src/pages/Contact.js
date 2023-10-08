import Box from "@mui/material/Box"
import classes from "./Contact.module.css"
import AuthFormHeader from "../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../components/Authentication/AuthFormFooter"
import ContactForm from "../components/ContactForm"
import RequestResponse from "../components/Authentication/RequestResponse"
import { useState } from "react"

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <Box className={classes.container}>
      <AuthFormHeader pageTitle={"Contact Us"} />
      {(isSubmitted && <RequestResponse type="contact us" />) || (
        <ContactForm setIsSubmitted={setIsSubmitted} />
      )}
      <AuthFormFooter type={isSubmitted ? "contact submitted" : "contact"} />
    </Box>
  )
}

export default Contact
