import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginForm from "./LoginForm"
import { server } from "../../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderComponent = () => {
  /*The LoginForm must be wrapped in the BrowserRouter since it contains a NavLink. 
    The NavLink uses useLocation hook which only works in the context of a router */
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  )
}

describe("LoginForm component", () => {
  test("Renders form fields.", () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const loginButton = screen.getByText(/log in/i)
    const rememberMeInput = screen.getByLabelText(/remember me/i)
    const loginHelpLabel = screen.getByText(/having trouble logging in?/i)
    const forgotUsernameLink = screen.getByText(/forgot username/i)
    const forgotPasswordLink = screen.getByText(/forgot password/i)
    const registerLabel = screen.getByText(/need an account?/i)
    const registerLink = screen.getByText(/create account/i)

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
    expect(rememberMeInput).toBeInTheDocument()
    expect(loginHelpLabel).toBeInTheDocument()
    expect(forgotUsernameLink).toBeInTheDocument()
    expect(forgotPasswordLink).toBeInTheDocument()
    expect(registerLabel).toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
  })
  test("receives input", () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]

    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })

    expect(usernameInput).toHaveValue("testuser")
    expect(passwordInput).toHaveValue("Test123$")
  })
  test("shows username and password do not match", async () => {
    let inputError = null
    renderComponent()

    let usernameInput = screen.getByLabelText(/username/i)
    let passwordInput = screen.getAllByLabelText(/password/i)[0]
    const loginButton = screen.getByText(/log in/i)

    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      inputError = screen.getByText(/Username and Password do not match./i)
      passwordInput = screen.getAllByLabelText(/password/i)[0]
    })

    expect(inputError).toBeInTheDocument()
  })
  test("user can successfully log in", async () => {
    // Define the data to be sent in the request body (as a JavaScript object)
    const postData = {
      username: "user",
      password: "password"
    }

    // Create the request options including the method, headers, and body
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData) // Convert the JavaScript object to a JSON string
    }

    // Make the POST request using the fetch API
    const response = await fetch(
      "http://localhost:8080/auth/login",
      requestOptions
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const responseJson = await response.json() // Parse the response as JSON

    // Assert the response data in your test
    expect(responseJson).toEqual({
      id: 1,
      username: "user",
      email: "test@email.com"
    })
  })
  test("form can be submitted", async () => {
    renderComponent()

    let usernameInput = screen.getByLabelText(/username/i)
    let passwordInput = screen.getAllByLabelText(/password/i)[0]
    const loginButton = screen.getByText(/log in/i)

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn")
      expect(isLoggedIn).toEqual(true)
    })
  })
})
