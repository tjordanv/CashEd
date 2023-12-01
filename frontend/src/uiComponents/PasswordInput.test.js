import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import PasswordInput, { validatePassword } from "./PasswordInput"

const setPasswordHandler = jest.fn()
const renderComponent = ({ password = "", error }) => {
  render(
    <PasswordInput
      password={password}
      inputHandler={setPasswordHandler}
      error={error}
    />
  )
}

describe("PasswordInput", () => {
  test("renders PasswordInput component with correct value", () => {
    renderComponent({ password: "pass" })
    const passwordInput = screen.getAllByLabelText(/password/i)[0]

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveValue("pass")
  })

  test("toggles password visibility", () => {
    renderComponent({})
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const visibilityButton = screen.getByLabelText("show password")

    // Password field should be hidden by default
    expect(passwordInput.type).toBe("password")
    // Click the visibility button
    fireEvent.click(visibilityButton)
    // Password field should become visible
    expect(passwordInput.type).toBe("text")
    // Click the visibility button again
    fireEvent.click(visibilityButton)
    // Password field should become hidden again
    expect(passwordInput.type).toBe("password")
  })

  test("displays error message when isError is true", () => {
    const error = { isError: true, message: "Invalid password" }
    renderComponent({ error: error })

    const errorText = screen.getByText(error.message)
    expect(errorText).toBeInTheDocument()
  })

  test("validates password correctly according to character requirements", () => {
    expect(validatePassword("Password1!")).toBe(true)
    expect(validatePassword("Password1")).toBe(false)
    expect(validatePassword("Pass1!")).toBe(false)
  })
})
