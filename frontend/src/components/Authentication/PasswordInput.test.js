import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import PasswordInput, { validatePassword } from "./PasswordInput"

describe("PasswordInput", () => {
  test("renders PasswordInput component", () => {
    const setPasswordHandler = jest.fn()
    render(<PasswordInput password="pass" inputHandler={setPasswordHandler} />)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveValue("pass")
  })

  test("toggles password visibility", () => {
    render(<PasswordInput password="" inputHandler={() => {}} />)
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
    const errorMessage = "Invalid password"
    render(
      <PasswordInput
        password=""
        inputHandler={() => {}}
        error={{ isError: true, message: errorMessage }}
      />
    )

    const errorText = screen.getByText(errorMessage)
    expect(errorText).toBeInTheDocument()
  })

  test("validates password correctly according to character requirements", () => {
    expect(validatePassword("Password1!")).toBe(true)
    expect(validatePassword("Password1")).toBe(false)
    expect(validatePassword("Pass1!")).toBe(false)
  })
})
