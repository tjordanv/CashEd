import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import classes from "./LoginForm.module.css"
import { Typography } from "@mui/material"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const logInHandler = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      if (response.status === 200) {
        try {
          const responseJson = await response.json()
          localStorage.setItem("jwt", responseJson.accessToken)
          navigate("/")
        } catch (error) {
          setMessage("user not found")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={logInHandler}>
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
          {message && <Typography>User not found</Typography>}
          <Button type="submit" variant="contained" className={classes.button}>
            Create Account
          </Button>
          <label>
            Already have an account? <NavLink to="/login">Log In</NavLink>
          </label>
        </Stack>
      </Box>
    </form>
  )
}

export default RegisterForm
