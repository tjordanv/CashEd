import FetchError from "./fetchError"

describe("FetchError", () => {
  test("Creates a new FetchError instance", () => {
    const message = "Error message"
    const statusCode = 404

    const error = new FetchError(message, statusCode)

    expect(error).toBeInstanceOf(FetchError)
    expect(error.message).toBe(message)
    expect(error.statusCode).toBe(statusCode)
  })

  test("Convert an HTTP response to a FetchError", async () => {
    const res = await fetch("http://localhost:8080/fetchErrorTest", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const error = await FetchError.fromResponse(res)

    expect(error).toBeInstanceOf(FetchError)
    expect(error.message).toBe("Server error")
    expect(error.statusCode).toBe(500)
  })
})
