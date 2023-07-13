import { redirect, useParams } from "react-router-dom"

const loader = async (token) => {
  const response = await fetch(
    `http://localhost:8080/auth/verifyToken?${new URLSearchParams({
      token: token
    })}`,
    {}
  )

  if (!response.ok) {
    console.log("response not ok")
    //return redirect("/auth/login")
  } else {
    const responseJson = await response.json()
    // console.log(responseJson)
    console.log("response ok")
  }
  return null
}

const PasswordReset = () => {
  //const { token } = useParams()

  return <p>hello world</p>
}

export { loader }

export default PasswordReset
