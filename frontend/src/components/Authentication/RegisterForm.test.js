import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterForm from "./RegisterForm"
import { server } from "../../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const setUserHandlerMock = jest.fn()
const renderComponent = () => {
  /*The RegisterForm must be wrapped in the BrowserRouter since it contains a NavLink. 
    The NavLink uses useLocation hook which only works in the context of a router */
  render(
    <BrowserRouter>
      <RegisterForm setUserHandler={setUserHandlerMock} />
    </BrowserRouter>
  )
}

describe("RegisterForm component", () => {
  test("renders form fields", () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const submitButton = screen.getByText(/Create Account/i)

    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  test("Receives input.", () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]

    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    fireEvent.change(emailInput, { target: { value: "test@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "Test123$" } })

    expect(usernameInput).toHaveValue("testuser")
    expect(emailInput).toHaveValue("test@email.com")
    expect(passwordInput).toHaveValue("Test123$")
    expect(confirmPasswordInput).toHaveValue("Test123$")
  })
  test("Shows username and email taken", async () => {
    let isUsernameTaken = null
    let isEmailTaken = null

    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByText(/Create Account/i)

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(emailInput, { target: { value: "taken@email.com" } })
    fireEvent.click(submitButton)

    // Wait for async operations to complete
    await waitFor(() => {
      isUsernameTaken = screen.getByText(/Username already taken./i)
      isEmailTaken = screen.getByText(/Email address already taken./i)
    })
    expect(isUsernameTaken).toBeInTheDocument()
    expect(isEmailTaken).toBeInTheDocument()
  })
  test("Shows username and email are available", async () => {
    let isUsernameTaken = null
    let isEmailTaken = null

    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByText(/Create Account/i)

    fireEvent.change(usernameInput, { target: { value: "newUser" } })
    fireEvent.change(emailInput, { target: { value: "test@email.com" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      isUsernameTaken = screen.queryByText(/Username already taken./i)
      isEmailTaken = screen.queryByText(/Email address already taken./i)
    })
    expect(usernameInput).not.toHaveClass("Mui-error")
    expect(emailInput).not.toHaveClass("Mui-error")
    expect(isUsernameTaken).toBeNull()
    expect(isEmailTaken).toBeNull()
  })

  test("Creates new user and logs them in", async () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const submitButton = screen.getByText(/Create Account/i)

    fireEvent.change(usernameInput, { target: { value: "testUser" } })
    fireEvent.change(emailInput, { target: { value: "test@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "Test123$" } })
    fireEvent.click(submitButton)

    // Wait for async operations to complete
    await waitFor(() => {
      expect(setUserHandlerMock).toHaveBeenCalled()
    })
  })
})
