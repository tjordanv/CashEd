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
import ConfirmationDialog from "../HelperComponents/ConfirmationDialog"
import { useSelector } from "react-redux"

const DrawerLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation().pathname

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setIsOpen(isOpen)
  }

  const navigationHandler = (pathname) => {
    if (pathname === "/auth/login") localStorage.removeItem("jwt")

    if (pathname !== location) navigate(pathname)
  }

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

  const notificationCounts = useSelector((state) => state.notifications.value)

  const drawerList = [
    {
      text: "Profile",
      pathname: "/profile",
      icon: AccountCircleIcon,
      badgeContent: notificationCounts["2"]
    },
    {
      text: "Notifications",
      pathname: "/notifications",
      icon: MailIcon,
      badgeContent: notificationCounts["1"]
    },
    {
      text: "Settings",
      pathname: "/settings",
      icon: SettingsIcon,
      badgeContent: notificationCounts["3"]
    },
    {
      text: "Logout",
      pathname: "/auth/login",
      icon: LogoutIcon,
      badgeContent: 0
    }
  ]

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
          <MenuIcon onClick={toggleDrawer(true)} />
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
