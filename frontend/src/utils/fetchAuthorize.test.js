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
  test("fail HTTP request without a valid jwt bearer token", async () => {
    localStorage.setItem("jwt", "invalidToken")
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
    expect(responseJson).toBe(false)
  })
})
