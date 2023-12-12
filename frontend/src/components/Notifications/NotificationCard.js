import Card from "@mui/material/Card"

/**
 * @description Renders a notification card component. <b>Not completed yet.</b>
 *
 * @param {Object} notification - The notification object.
 * @param {string} notification.subject - The subject of the notification.
 * @param {string} notification.createdDate - The creation date of the notification.
 * @returns {JSX.Element} The rendered notification card.
 */
const NotificationCard = ({ notification }) => {
  return (
    <Card>
      <h5>{notification.subject}</h5>
      <p>{notification.createdDate}</p>
    </Card>
  )
}

export default NotificationCard
