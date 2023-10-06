import Box from "@mui/material/Box"
import classes from "./Contact.module.css"
import AuthFormHeader from "../components/Authentication/AuthFormHeader"
import AuthFormFooter from "../components/Authentication/AuthFormFooter"
import ContactForm from "../components/ContactForm"

const Contact = () => {
  return (
    <Box className={classes.container}>
      <AuthFormHeader pageTitle={"Contact Us"} />
      <ContactForm />
      {/* <AuthFormFooter type="login" /> */}
    </Box>
  )
}

export default Contact
