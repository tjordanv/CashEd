import { useLoaderData } from "react-router-dom"
import fetcher from "../../utils/fetchAuthorize"
import FetchError from "../../utils/fetchError"
import NotificationCard from "./NotificationCard"

/**
 * @async
 * @function notificationsLoader
 * @description Fetches notifications for the current user by category.
 * @returns {Promise<Array<Object>>} - The array of notifications.
 */
const notificationsLoader = async () => {
  if (localStorage.jwt) {
    try {
      const response = await fetcher(
        `http://localhost:8080/getNotificationsByUserByCategory?${new URLSearchParams(
          { categoryId: 1 }
        )}`
      )
      if (!response.ok) throw new FetchError.fromResponse(response)
      else if (response.status === 200) {
        return await response.json()
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
  console.log("did not try")
  return null
}

export { notificationsLoader }

/**
 * @description Renders the notifications. <b>Not completed yet.</b>
 * @returns {JSX.Element} - The rendered notifications.
 */
const Notifications = () => {
  const notifications = useLoaderData()

  return (
    <>
      {notifications &&
        notifications.map((notification) => (
          <NotificationCard notification={notification} key={notification.id} />
        ))}
    </>
  )
}
export default Notifications
