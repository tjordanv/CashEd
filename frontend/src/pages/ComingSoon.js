import { Typography } from "@mui/material"
import React from "react"
import { NavLink } from "react-router-dom"

const ComingSoon = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h2">Coming Soon</Typography>
      <Typography variant="h6">
        This page is currently under construction.
      </Typography>
      <NavLink to="/" className="">
        <Typography variant="button" sx={{ color: "#17c3b2" }}>
          Back to Dashboard
        </Typography>
      </NavLink>
    </div>
  )
}

export default ComingSoon
