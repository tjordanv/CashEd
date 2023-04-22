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

async function test() {
  const response = await fetcher("http://localhost:8080/test", {})
  if (response.status === 200) {
    console.log("Authorized")
  } else {
    console.log("Unauthorized")
  }
}

const DashboardTest = () => {
  const loaderData = useLoaderData()

  const navigate = useNavigate()

  return (
    <>
      <p>Dashboard</p>
      <Button variant="contained" onClick={test}>
        test auth
      </Button>
    </>
  )
}

export default DashboardTest
