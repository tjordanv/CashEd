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
import ConfirmationDialog from "./HelperComponents/ConfirmationDialog"
import Zoom from "@mui/material/Zoom"
import SaveIcon from "@mui/icons-material/Save"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"
import Collapse from "@mui/material/Collapse"

const AccountCard = ({
  account,
  removeAccountHandler,
  updateNicknameHandler
}) => {
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
              value={account.nickname}
              onChange={(e) =>
                updateNicknameHandler(account.id, e.target.value)
              }
              className={classes.nicknameInput}
            />
            <Tooltip
              title="Save"
              arrow
              TransitionComponent={Zoom}
              className={classes.saveButton}
            >
              <IconButton onClick={() => console.log(account)}>
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
