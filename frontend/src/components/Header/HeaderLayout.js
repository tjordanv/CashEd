import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import classes from "./HeaderLayout.module.css"
import DrawerLayout from "./DrawerLayout"
import fetcher from "../../utils/fetchAuthorize"
import FetchError from "../../utils/fetchError"
import { useDispatch, useSelector } from "react-redux"
import { fetchNotificationCounts } from "../../state/notificationsSlice"
import { useEffect } from "react"

/**
 * @async
 * @function headerNotificationsLoader
 * @description Fetches the unread notification counts for the current user from the server.
 * @returns {Promise<Array>|boolean} - Returns an array of notification counts if the user is authenticated, otherwise returns false.
 */
const headerNotificationsLoader = async () => {
  if (localStorage.jwt) {
    try {
      const response = await fetcher(
        "http://localhost:8080/getUnreadNotificationsByUserByCategory"
      )
      if (!response.ok) throw new FetchError.fromResponse(response)
      else if (response.status === 200) {
        return await response.json()
      }
    } catch (error) {
      // Handle a server side error
      if (error instanceof FetchError) {
        console.log("fetch error")
      }
      // return false if the user is not authenticated
      return false
    }
  }
  return false
}

export { headerNotificationsLoader }

/**
 * @description Renders the header component that allows the user to navigate through the application. Redirects the user to the landing page if they are not authenticated.
 * @example <Header />
 * @returns {JSX.Element} The JSX element representing the header navigation bar.
 */
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useLoaderData()

  useEffect(() => {
    // If the user is not authenticated, send them to the landing (home) page
    if (isAuthenticated === false) {
      navigate("/home")
    }
  })

  // I may need to use redux to track this state to have accurate data when updates happen. unsure
  // set global state for notification counts that were fetched in the loader function prior to rendering the component
  dispatch(fetchNotificationCounts(useLoaderData()))
  const notificationCounts = useSelector((state) => state.notifications.value)

  return (
    // add confirmation functionality to prevent users from navigating without saving changes first
    <Box className={classes.container}>
      <Stack
        className={classes.list}
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={6}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="TransactionImport"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Transaction Import
        </NavLink>
        <NavLink
          to="nothing"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Budget
        </NavLink>
        <NavLink
          to="accounts"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Accounts
        </NavLink>
        <NavLink
          to="home/AboutUs"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          About Us
        </NavLink>
        <NavLink
          to="last"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Contact Us
        </NavLink>
        <DrawerLayout />
      </Stack>
    </Box>
  )
}

export default Header
