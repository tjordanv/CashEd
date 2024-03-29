import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginForm from "./LoginForm"

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

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
    expect(rememberMeInput).toBeInTheDocument()
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
    renderComponent()

    let usernameInput = screen.getByLabelText(/username/i)
    let passwordInput = screen.getAllByLabelText(/password/i)[0]
    const loginButton = screen.getByText(/log in/i)

    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Username and Password do not match./i)
      ).toBeInTheDocument()
    })
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
    expect(responseJson.username).toEqual("user")
  })
  test("form can be submitted and accepted", async () => {
    renderComponent()

    let usernameInput = screen.getByLabelText(/username/i)
    let passwordInput = screen.getAllByLabelText(/password/i)[0]
    const loginButton = screen.getByText(/log in/i)

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(sessionStorage.getItem("isLoggedIn")).toEqual("true")
    })
  })
})
