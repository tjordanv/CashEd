import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
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
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const DrawerLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setIsOpen(isOpen)
  }

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("jwt")
    navigate("/login")
  }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Profile", icon: AccountCircleIcon, eventHandler: null },
          { text: "Notifications", icon: MailIcon, eventHandler: null },
          { text: "Settings", icon: SettingsIcon, eventHandler: null },
          { text: "Logout", icon: LogoutIcon, eventHandler: logoutHandler }
        ].map((obj) => (
          <ListItem key={obj.text} disablePadding>
            <ListItemButton onClick={obj.eventHandler}>
              <ListItemIcon>
                <obj.icon />
              </ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItemButton>
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
