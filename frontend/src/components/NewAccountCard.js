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
  Input
} from "@mui/material"
import FormButton from "./Authentication/FormButton"
import classes from "./NewAccountCard.module.css"
import DeleteIcon from "@mui/icons-material/Delete"

const NewAccountCard = ({ account }) => {
  const logoBase64 = `data:image/png;base64,${account.logo}`
  const Logo = (
    <Avatar src={logoBase64} alt="Logo" className={classes.logo}></Avatar>
  )
  const title = `${account.name}: ${account.subtype}`
  const subheader = `ending in ${account.mask}`

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
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{account.officialName}</Typography>
        <Input placeholder="Nickname" variant="standard" size="small" />
        <FormButton label="SAVE" type="submit" size="small" />
      </CardContent>
    </Card>
  )
}

export default NewAccountCard
