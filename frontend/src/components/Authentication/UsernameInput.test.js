import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import UsernameInput, { validateUsername } from "./UsernameInput"

describe("UsernameInput", () => {
  test("renders the input field with correct value", () => {
    const setUsernameHandler = jest.fn()
    render(
      <UsernameInput
        username="testuser"
        setUsernameHandler={setUsernameHandler}
      />
    )

    const inputElement = screen.getByLabelText(/Username/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("testuser")
  })

  test("calls the setUsernameHandler when input changes", () => {
    const setUsernameHandler = jest.fn()
    render(
      <UsernameInput username="" setUsernameHandler={setUsernameHandler} />
    )

    const inputElement = screen.getByLabelText(/Username/i)
    fireEvent.change(inputElement, { target: { value: "testuser" } })

    expect(setUsernameHandler).toHaveBeenCalledTimes(1)
    expect(setUsernameHandler).toHaveBeenCalledWith("testuser")
  })

  test("displays error helper text when error is true", () => {
    const error = { isError: true, message: "Invalid username" }
    render(
      <UsernameInput username="" setUsernameHandler={() => {}} error={error} />
    )

    const helperText = screen.getByText(/Invalid username/i)
    expect(helperText).toBeInTheDocument()
  })

  test("validates username correctly with validateUsername function", () => {
    expect(validateUsername("userWNum123")).toBe(true)
    expect(validateUsername("valid_Username")).toBe(true)
    expect(validateUsername("inv@lid_username")).toBe(false)
    expect(validateUsername("use")).toBe(false)
    expect(validateUsername("usernameIsTooLongToPass")).toBe(false)
    expect(validateUsername(undefined)).toBe(false)
  })
})
