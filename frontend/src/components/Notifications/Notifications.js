import { useLoaderData } from "react-router-dom"

import fetcher from "../HelperFunctions/fetchAuthorize"
import FetchError from "../HelperComponents/FetchError"
import NotificationCard from "./NotificationCard"

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
