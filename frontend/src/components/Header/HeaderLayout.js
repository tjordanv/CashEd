import { styled } from "@mui/material/styles"
import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import classes from "./HeaderLayout.module.css"
import DrawerLayout from "./DrawerLayout"
import fetcher from "../HelperFunctions/fetchAuthorize"
import FetchError from "../HelperComponents/FetchError"
import { useDispatch, useSelector } from "react-redux"
import { fetchNotificationCounts } from "../../state/notificationsSlice"
import { useEffect } from "react"

const HeaderContainer = styled(Box)(({ theme }) => ({
  height: "6vh",
  borderBottom: "2px solid rgba(119, 119, 119, 0.2)"
}))

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
    <HeaderContainer>
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
    </HeaderContainer>
  )
}
export default Header
