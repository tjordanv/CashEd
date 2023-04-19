import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import classes from "./LoginForm.module.css"
import fetcher from "../wrappers/fetchAuthorize"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dummyData = { username: "username", password: "password" }
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
      const responseJson = await response.json()
      console.log(responseJson)
      if (response.status === 200) {
        localStorage.setItem("jwt", responseJson.accessToken)
        setUsername("")
        setPassword("")
        console.log("congrats on signing in")
      } else {
        console.log("user not found")
      }
    } catch (error) {
      console.log(error)
    }
    // if (username === dummyData.username && password === dummyData.password) {
    //   navigate("/")
    //}
  }

  async function grabData() {
    const response = await fetcher("http://localhost:8080/test", {
      //headers: { Authorization: `Bearer ${token}` }
    })
    if (response.status === 200) {
      console.log("Authorized")
    } else {
      console.log("Unauthorized")
    }
  }

  const logout = () => {
    localStorage.removeItem("jwt")
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
          <Button type="submit" variant="contained" className={classes.button}>
            Log in
          </Button>
          <FormControlLabel control={<Switch />} label="Remember Me" />
          {/* use a router Link or NavLink for "Create Account" */}
        </Stack>
        <Button
          onClick={() => grabData()}
          variant="contained"
          className={classes.button}
        >
          test
        </Button>
        <Button
          onClick={() => logout()}
          variant="contained"
          className={classes.button}
        >
          logout
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
