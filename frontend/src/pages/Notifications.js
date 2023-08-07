import Badge from "@mui/material/Badge"
import MailIcon from "@mui/icons-material/Mail"

const Notifications = () => {
  return (
    <>
      <h1>Notifications</h1>
      <Badge color="secondary" badgeContent={10}>
        <MailIcon />
      </Badge>
    </>
  )
}
export default Notifications
