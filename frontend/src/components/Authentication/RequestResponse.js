import Typography from "@mui/material/Typography"
import classes from "./Auth.module.css"
import Box from "@mui/material/Box"
import { Test } from "./FormFooter"

/**
 * The message displayed to users following various authentication requests made by them
 * @param {string} type the type of request that was made, used to determine the appropriate response
 */
const RequestResponse = ({ type }) => {
  let text
  switch (type) {
    case "user recovery":
      text =
        "Thank you for confirming your account.\nCheck your email for your login information."
      break
    case "password reset":
      text = "Your password has been successfully updated"
      break
    case "contact us":
      text = "Thank you for contacting us!\nWe will be in touch :)"
      break
    default:
      text = ""
  }

  const footerData = {
    topLink: {
      to: "/register",
      text: "Register"
    },
    bottomLink: {
      to: "/login",
      text: "Login"
    }
  }

  return (
    <>
      <Box className={classes.container}>
        <Typography className={classes.requestResponse}>{text}</Typography>
      </Box>
      <Test topLink={footerData.topLink} bottomLink={footerData.bottomLink} />
    </>
  )
}

export default RequestResponse
