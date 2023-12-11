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
 * unsaved changes and account saved alerts used in the card header action
 * @param {boolean} nicknameFlag whether or not the nickname has been changed
 * @param {boolean} isAlert weather or not the account saved alert to be shown
 * @param {function} setIsAlert the handler to set isAlert
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
 * the component that gets passed to the confirmation dialog as a prop
 * @param {function} func the function to be executed upon confirmation
 */
const component = ({ func }) => (
  <Tooltip title="Remove" arrow TransitionComponent={Zoom}>
    <IconButton onClick={func}>
      <DeleteIcon color="#777777" />
    </IconButton>
  </Tooltip>
)

/**
 * The card component that renders a given bank account object
 * @param {object} account the bank account object to be rendered onto the card
 * @param {function} removeAccountHandler the function that handles deleting the account
 * @param {function} saveAccountHandler the function that handles saving the account after changes were made to it
 */
const AccountCard = ({ account, removeAccountHandler, saveAccountHandler }) => {
  const [nickname, setNickname] = useState(account.nickname)
  const [nicknameFlag, setNicknameFlag] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const expandClasses = `${classes["expandMore"]} ${
    isExpanded ? classes["expandMoreExpanded"] : ""
  }`
  const logoBase64 = `data:image/png;base64,${account.logo}`
  const Logo = (
    <Avatar src={logoBase64} alt="Logo" className={classes.logo}></Avatar>
  )
  const title = `${account.name}: ${account.subtype}`
  const subheader = `ending in ${account.mask}`
  const confirmationDialogDetails = {
    title: "Remove Account?",
    description: null,
    confirmationLabel: "Remove"
  }

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
  }

  const test = () => {
    console.log(account)
  }
  return (
    <Card className={classes.container}>
      <CardHeader
        className={classes.cardHeader}
        avatar={Logo}
        title={title}
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
