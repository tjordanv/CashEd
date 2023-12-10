import Box from "@mui/material/Box"
import classes from "./Contact.module.css"
import FormHeader from "../components/auth/FormHeader"
import ContactForm from "../components/ContactForm"
import RequestResponse from "../components/auth/RequestResponse"
import { useState } from "react"

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Contact Us"} />
      {(isSubmitted && <RequestResponse type="contact us" />) || (
        <ContactForm setIsSubmitted={setIsSubmitted} />
      )}
    </Box>
  )
}

export default Contact
