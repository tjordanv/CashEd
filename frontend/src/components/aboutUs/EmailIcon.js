import classes from "./EmailIcon.module.css"
import email from "../../assets/email.svg"
import Alert from "@mui/material/Alert"
import copy from "clipboard-copy"
import { useState } from "react"
import { useEffect } from "react"

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
