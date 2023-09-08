import { Box } from "@mui/material"
import { NavLink } from "react-router-dom"

const FinalResponse = () => {
  return (
    <Box>
      <h1>check your email for recovery information.</h1>
      <NavLink to="/auth/login">Login</NavLink>
    </Box>
  )
}

export default FinalResponse
