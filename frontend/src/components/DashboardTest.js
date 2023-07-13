import { redirect, useLoaderData, useNavigate } from "react-router-dom"

import React, { useEffect, useState } from "react"
import { usePlaidLink } from "react-plaid-link"

import Button from "@mui/material/Button"
import fetcher from "./HelperFunctions/fetchAuthorize"

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
    return redirect("/auth/login")
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

// const DashboardTest = () => {
//   const loaderData = useLoaderData()

//   const navigate = useNavigate()

//   return (
//     <>
//       <p>Dashboard</p>
//       <Button variant="contained" onClick={test}>
//         test auth
//       </Button>
//     </>
//   )
// }

// export default DashboardTest

const DashboardTest = () => {
  const [linkToken, setLinkToken] = useState(null)
  const generateToken = async () => {
    const response = await fetcher("http://localhost:8080/create_link_token", {
      method: "POST"
    })
    const data = await response.json()
    setLinkToken(data.link_token)
  }
  useEffect(() => {
    generateToken()
  }, [])
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>
}
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

const Link = (LinkProps) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch("/api/set_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ public_token })
    })
    // Handle response ...
  }, [])
  const config = {
    token: LinkProps.linkToken,
    receivedRedirectUri: window.location.href,
    onSuccess
  }
  const { open, ready } = usePlaidLink(config)
  return (
    <>
      <p>yo</p>
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>
    </>
  )
}
export default DashboardTest
