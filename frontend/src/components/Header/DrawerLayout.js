import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MailIcon from "@mui/icons-material/Mail"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { Fragment, useState } from "react"
import { Badge, IconButton } from "@mui/material"
import { useLocation, useNavigate, useLoaderData } from "react-router-dom"
import ConfirmationDialog from "../../uiComponents/ConfirmationDialog"

/**
 * @class
 * @classdesc Represents a drawer layout component.
 * @example <DrawerLayout />
 * @returns {JSX.Element} The JSX element representing the drawer layout.
 */
const DrawerLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  // this is used to track the current location of the user
  const location = useLocation().pathname

  // used to open and close the drawer
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setIsOpen(isOpen)
  }

  // used to navigate to the appropriate page
  const navigationHandler = (pathname) => {
    if (pathname === "/login") localStorage.removeItem("jwt")

    if (pathname !== location) navigate(pathname)
  }

  /**
   * @description Represents a component used in the confirmation dialog.
   * @param {Object} obj - The object containing component details.
   * @param {string} obj.text - The text to be displayed in the component.
   * @param {string} obj.pathname - The pathname to navigate to on component click.
   * @param {Function} obj.icon - The icon to be displayed in the component.
   * @param {number} obj.badgeContent - The number to be displayed in the component's badge.
   * @param {Function} func - The function to be called on component click.
   * @returns {JSX.Element} The JSX element representing the component.
   */
  const Comp = ({ obj, func }) => (
    <ListItemButton onClick={func}>
      <ListItemIcon>
        <Badge color="primary" badgeContent={obj.badgeContent}>
          <obj.icon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary={obj.text} />
    </ListItemButton>
  )

  const confirmationDialogDetails = (obj) => {
    return {
      title:
        obj.text === "Logout"
          ? "Are you sure you want to logout?"
          : "Are you sure you want to leave this page?",
      description:
        location === "/" ? undefined : "All unsaved progress will be lost",
      confirmationLabel: obj.text === "Logout" ? "Logout" : "OK"
    }
  }

  // I may need to use redux to track this state to have accurate data when updates happen. unsure
  const notificationCounts = useLoaderData()

  // used to populate the drawer, each object represents a drawer item that get passed to Comp
  const drawerList = [
    {
      text: "Profile",
      pathname: "/profile",
      icon: AccountCircleIcon,
      badgeContent: notificationCounts !== null ? notificationCounts["2"] : 0
    },
    {
      text: "Notifications",
      pathname: "/notifications",
      icon: MailIcon,
      badgeContent: notificationCounts !== null ? notificationCounts["1"] : 0
    },
    {
      text: "Settings",
      pathname: "/settings",
      icon: SettingsIcon,
      badgeContent: notificationCounts !== null ? notificationCounts["3"] : 0
    },
    {
      text: "Logout",
      pathname: "/login",
      icon: LogoutIcon,
      badgeContent: 0
    }
  ]

  // used to render the drawer when it is open
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {drawerList.map((obj) => (
          <ListItem key={obj.text} disablePadding>
            {location !== "/" || obj.text === "Logout" ? (
              <ConfirmationDialog
                Component={Comp}
                componentDetails={obj}
                dialogDetails={confirmationDialogDetails(obj)}
                onConfirm={() => navigationHandler(obj.pathname)}
              />
            ) : (
              <Comp obj={obj} func={() => navigationHandler(obj.pathname)} />
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      <Fragment>
        <IconButton aria-label="Menu">
          <Badge
            color="primary"
            variant="dot"
            invisible={
              notificationCounts === null ||
              Object.keys(notificationCounts).length === 0
            }
          >
            <MenuIcon onClick={toggleDrawer(true)} />
          </Badge>
        </IconButton>
        {/* <Button onClick={toggleDrawer(true)}>drawer</Button> */}
        <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Fragment>
    </div>
  )
}

export default DrawerLayout
