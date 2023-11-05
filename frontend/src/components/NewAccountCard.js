import {
  Card,
  CardContent,
  Button,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  TextField,
  Typography,
  Input,
  Tooltip,
  CardActions
} from "@mui/material"
import FormButton from "./Authentication/FormButton"
import classes from "./NewAccountCard.module.css"
import DeleteIcon from "@mui/icons-material/Delete"
import ConfirmationDialog from "./HelperComponents/ConfirmationDialog"
import Zoom from "@mui/material/Zoom"
import SaveIcon from "@mui/icons-material/Save"

const NewAccountCard = ({ account, removeAccountHandler }) => {
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
        avatar={Logo}
        title={title}
        subheader={subheader}
        titleTypographyProps={{
          fontSize: 22
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{account.officialName}</Typography>
        <TextField
          label="Nickname"
          size="small"
          variant="standard"
        />
        {/* <Input placeholder="Nickname" variant="standard" size="small" /> */}
        {/* <FormButton label="SAVE" type="submit" size="small" /> */}
      </CardContent>
      <CardActions>
        <Tooltip
          title="Save"
          arrow
          TransitionComponent={Zoom}
          className={classes.saveButton}
        >
          <IconButton>
            <SaveIcon color="#777777" />
          </IconButton>
        </Tooltip>
        <ConfirmationDialog
          dialogDetails={confirmationDialogDetails}
          onConfirm={() => removeAccountHandler(account.accountId)}
          Component={component}
        />
      </CardActions>
    </Card>
  )
}

export default NewAccountCard
