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
import ConfirmationDialog from "../helperComponents/ConfirmationDialog"
import Zoom from "@mui/material/Zoom"
import SaveIcon from "@mui/icons-material/Save"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState, useEffect } from "react"
import Collapse from "@mui/material/Collapse"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import Alert from "@mui/material/Alert"

const AccountCard = ({ account, removeAccountHandler, saveAccountHandler }) => {
  const [nickname, setNickname] = useState(account.nickname)
  const [nicknameFlag, setNicknameFlag] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const UnsavedChanges = () => {
    if (nicknameFlag) {
      return (
        <Tooltip title="unsaved changes">
          <ErrorOutlineOutlinedIcon fontSize="large" color="danger" />
        </Tooltip>
      )
    } else if (isAlert) {
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
  const component = ({ func }) => (
    <Tooltip title="Remove" arrow TransitionComponent={Zoom}>
      <IconButton onClick={func}>
        <DeleteIcon color="#777777" />
      </IconButton>
    </Tooltip>
  )

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
        action={<UnsavedChanges />}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{account.officialName}</Typography>
        {/* <Input placeholder="Nickname" variant="standard" size="small" /> */}
        {/* <FormButton label="SAVE" type="submit" size="small" /> */}
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
