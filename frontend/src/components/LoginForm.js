import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import classes from "./LoginForm.module.css"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dummyData = { username: "username", password: "password" }
  const navigate = useNavigate()

  const signInHandler = (e) => {
    e.preventDefault()
    if (username === dummyData.username && password === dummyData.password) {
      navigate("/")
    }
  }

  return (
    <form onSubmit={signInHandler} method="post">
      <Box className={classes.container}>
        <Stack spacing={1}>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.inputField}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputField}
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Log in
          </Button>
          <FormControlLabel control={<Switch />} label="Remember Me" />
          {/* use a router Link or NavLink for "Create Account" */}
        </Stack>
      </Box>
    </form>
  )
}

export default LoginForm
