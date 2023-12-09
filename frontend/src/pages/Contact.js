import Box from "@mui/material/Box"
import classes from "./Contact.module.css"
import FormHeader from "../components/authentication/FormHeader"
import FormFooter from "../components/authentication/FormFooter"
import ContactForm from "../components/ContactForm"
import RequestResponse from "../components/authentication/RequestResponse"
import { useState } from "react"

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <Box className={classes.container}>
      <FormHeader pageTitle={"Contact Us"} />
      {(isSubmitted && <RequestResponse type="contact us" />) || (
        <ContactForm setIsSubmitted={setIsSubmitted} />
      )}
      {/* <FormFooter type={isSubmitted ? "contact submitted" : "contact"} /> */}
    </Box>
  )
}

export default Contact
