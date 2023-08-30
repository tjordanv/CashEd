import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RegisterForm from "./RegisterForm"
import { server } from "../../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("RegisterForm component", () => {
  test("renders form fields", () => {
    const setUserHandlerMock = jest.fn()

    /*The RegisterForm must be wrapped in the BrowserRouter since it contains a NavLink. 
    The NavLink uses useLocation hook which only works in the context of a router */
    render(
      <BrowserRouter>
        <RegisterForm setUserHandler={setUserHandlerMock} />
      </BrowserRouter>
    )

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
    const setUserHandlerMock = jest.fn()

    render(
      <BrowserRouter>
        <RegisterForm setUserHandler={setUserHandlerMock} />
      </BrowserRouter>
    )

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
  test("Handles form submission", async () => {
    const setUserHandlerMock = jest.fn()

    render(
      <BrowserRouter>
        <RegisterForm setUserHandler={setUserHandlerMock} />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText(/Username/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const submitButton = screen.getByText(/Create Account/i)

    fireEvent.change(usernameInput, { target: { value: "testuser" } })
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
