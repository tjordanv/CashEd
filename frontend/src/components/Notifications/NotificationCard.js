import Card from "@mui/material/Card"

const NotificationCard = ({ notification }) => {
  return (
    <Card>
      <h5>{notification.subject}</h5>
      <p>{notification.createdDate}</p>
    </Card>
  )
}

export default NotificationCard
