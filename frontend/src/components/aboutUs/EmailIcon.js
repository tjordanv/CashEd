import classes from "./EmailIcon.module.css"
import email from "../../assets/email.svg"
import Alert from "@mui/material/Alert"
import copy from "clipboard-copy"
import { useState } from "react"
import { useEffect } from "react"

/**
 * @description An email icon that allows users to copy the email address of the corresponding creator to their clipboard. Used in the BioCard component.
 * @param {string} email - the email address that will be copied to clipboard when the icon is clicked
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
const EmailIcon = () => {
  const [isAlert, setIsAlert] = useState(false)

  const ReturnContent = () => {
    if (isAlert) {
      return (
        <div className={classes.emailAlertContainer}>
          <Alert severity="info" className={classes.emailAlert}>
            Email address copied to clipboard.
          </Alert>
        </div>
      )
    } else {
      return (
        <img
          title="TylerVicari@gmail.com"
          src={email}
          alt="email"
          className={classes.emailImage}
          style={{ "--color": "#FBBC05" }}
          onClick={() => copyToClipboard("tylervicari@gmail.com")}
        />
      )
    }
  }

  const copyToClipboard = async (textToCopy) => {
    try {
      await copy(textToCopy) // Copy text to clipboard
      setIsAlert(true)
    } catch (error) {
      console.error("Error copying text:", error)
    }
  }

  // display the alert (Email address copied to clipboard.) for 3 seconds
  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        setIsAlert(false)
      }, 3000)
    }
  }, [isAlert])

  return <ReturnContent />
}
export default EmailIcon
