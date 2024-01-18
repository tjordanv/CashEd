import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  CardActions
} from "@mui/material"
import classes from "./AccountCard.module.css"
import DeleteIcon from "@mui/icons-material/Delete"
import ConfirmationDialog from "../../uiComponents/ConfirmationDialog"
import Zoom from "@mui/material/Zoom"
import SaveIcon from "@mui/icons-material/Save"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState, useEffect } from "react"
import Collapse from "@mui/material/Collapse"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import Alert from "@mui/material/Alert"

/**
 * @class
 * @classdesc The card component that renders a given bank account object
 * @param {object} account - the bank account object to be rendered onto the card
 * @param {number} account.id - the id of the account
 * @param {string} account.accountId - the account_id of the account
 * @param {string} account.mask - the mask of the account
 * @param {string} account.name - the name of the account
 * @param {string} account.officialName - the official name of the account
 * @param {string} account.logo - the logo of the account. This is a base64 string that is converted to an image in the component
 * @param {string} account.subtype - the subtype of the account
 * @param {string} account.nickname - the nickname of the account (can be changed by the user)
 * @param {function} removeAccountHandler - the function that handles deleting the account
 * @param {function} saveAccountHandler the function that handles saving the account after changes were made to it
 * @example <AccountCard account={account} removeAccountHandler={removeAccountHandler} saveAccountHandler={saveAccountHandler} />
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
const AccountCard = ({ account, removeAccountHandler, saveAccountHandler }) => {
  const [nickname, setNickname] = useState(account.nickname)
  const [nicknameFlag, setNicknameFlag] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  /**
   * @description 'unsaved changes' and 'account saved' alerts used in the card header action
   * @param {boolean} nicknameFlag - whether or not the nickname has been changed
   * @param {boolean} isAlert - whether or not the account saved alert should be shown
   * @param {function} setIsAlert - the react state setter function that will modify the state of the parent component as needed
   * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
   */
  const UnsavedChanges = ({ nicknameFlag, isAlert, setIsAlert }) => {
    // render the unsaved changes alert if an account has unsaved changes
    if (nicknameFlag) {
      return (
        <Tooltip title="unsaved changes">
          <ErrorOutlineOutlinedIcon fontSize="large" color="danger" />
        </Tooltip>
      )
    } else if (isAlert) {
      // render the account saved alert once changes are saved
      return (
        <Alert
          onClose={() => {
            setIsAlert(false)
          }}
        >
          Account saved
        </Alert>
      )
    }
  }

  /**
   * @description The component that gets passed to the confirmation dialog as a prop
   * @param {function} func - the function to be executed upon confirmation
   * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
   */
  const component = ({ func }) => (
    <Tooltip title="Remove" arrow TransitionComponent={Zoom}>
      <IconButton onClick={func}>
        <DeleteIcon color="#777777" />
      </IconButton>
    </Tooltip>
  )
  const confirmationDialogDetails = {
    title: "Remove Account?",
    description: null,
    confirmationLabel: "Remove"
  }

  // classes used for styling the card when expanded
  const expandClasses = `${classes["expandMore"]} ${
    isExpanded ? classes["expandMoreExpanded"] : ""
  }`
  // convert the logo base64 string to an image
  const logoBase64 = `data:image/png;base64,${account.logo}`
  const Logo = (
    <Avatar src={logoBase64} alt="$" className={classes.logo}></Avatar>
  )
  const subheader = `${account.subtype}: ending in ${account.mask}`

  // update flag state if changes are made to the account
  useEffect(() => {
    if (nickname !== account.nickname) {
      setNicknameFlag(true)
    } else {
      setNicknameFlag(false)
    }
  }, [nickname, account.nickname])

  const saveAccount = () => {
    saveAccountHandler(account.id, nickname)
    setNicknameFlag(false)
    setIsAlert(true)

    // Set a timer to set isAlert to false after 4 seconds
    setTimeout(() => {
      setIsAlert(false)
    }, 4000) // 4000 milliseconds = 4 seconds
  }

  return (
    <Card className={classes.container}>
      <CardHeader
        className={classes.cardHeader}
        avatar={Logo}
        title={account.name}
        subheader={subheader}
        titleTypographyProps={{
          fontSize: 22
        }}
        action={
          <UnsavedChanges
            nicknameFlag={nicknameFlag}
            isAlert={isAlert}
            setIsAlert={setIsAlert}
          />
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{account.officialName}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton
          className={expandClasses}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.expandedContent}>
            <TextField
              label="Nickname"
              size="small"
              variant="standard"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={classes.nicknameInput}
            />
            <Tooltip
              title="Save"
              arrow
              TransitionComponent={Zoom}
              className={classes.saveButton}
            >
              <IconButton onClick={saveAccount}>
                <SaveIcon color="#777777" />
              </IconButton>
            </Tooltip>
            <ConfirmationDialog
              dialogDetails={confirmationDialogDetails}
              onConfirm={() => removeAccountHandler(account.id)}
              Component={component}
            />
          </CardContent>
        </Collapse>
      </CardActions>
    </Card>
  )
}

export default AccountCard
