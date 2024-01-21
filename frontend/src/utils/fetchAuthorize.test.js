import { waitFor } from "@testing-library/react"
import fetcher from "./fetchAuthorize"

describe("fetcher", () => {
  test("adds bearer token to HTTP request", async () => {
    localStorage.setItem("jwt", "validToken")
    const response = await waitFor(() =>
      fetcher("http://localhost:8080/fetcherTest", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
    )
    const responseJson = await response.json()
    expect(responseJson).toBe(true)
  })

  //   test("does not add Authorization header when JWT token is not present", () => {
  //     getToken(false)

  //     const options = { headers: { "Content-Type": "application/json" } }
  //     const updatedOptions = updateOptions(options)

  //     expect(updatedOptions.headers.Authorization).toBeUndefined()
  //   })
})
