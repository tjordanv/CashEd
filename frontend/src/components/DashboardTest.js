import { redirect, useLoaderData, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import fetcher from "../wrappers/fetchAuthorize"

async function grabData() {
  const response = await fetcher("http://localhost:8080/model", {})
  try {
    const data = await response.json()

    //   console.log(data)
    return data
  } catch {
    console.log("no data returned by grabData")
  }
}

export async function loader() {
  const data = await grabData()
  if (!data) {
    console.log("redirect")
    return redirect("/login")
  }
  console.log(data)
  return null
}

const DashboardTest = () => {
  const loaderData = useLoaderData()

  const navigate = useNavigate()

  const logoutHandler = () => {
    fetch("http://localhost:8080/logout", { method: "POST", mode: "cors" })
    //navigate("/logout")
  }
  return (
    <>
      <p>Dashboard</p>
      <Button onClick={logoutHandler} variant="contained">
        Logout
      </Button>
    </>
  )
}

export default DashboardTest
