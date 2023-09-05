import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import NameInput, { validateName } from "./NameInput"

describe("NameInput", () => {
  const setNameHandler = jest.fn()
  // When rendering the component with no params object, you must pass an empty object to avoid undefined properties error
  // Ex: renderComponent({})
  const renderComponent = ({ name = "", isLastName, error }) => {
    render(
      <NameInput
        name={name}
        setNameHandler={setNameHandler}
        isLastName={isLastName}
        error={error}
      />
    )
  }
  test("renders the input field with correct value and first name label", () => {
    renderComponent({ name: "John" })

    const inputElement = screen.getByLabelText(/First Name/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("John")
  })
  test("renders the input field with correct value and last name label", () => {
    renderComponent({ name: "Doe", isLastName: true })

    const inputElement = screen.getByLabelText(/Last Name/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("Doe")
  })
  test("calls the setNameHandler when input changes", () => {
    renderComponent({})

    const inputElement = screen.getByLabelText(/First Name/i)
    fireEvent.change(inputElement, { target: { value: "John" } })

    expect(setNameHandler).toHaveBeenCalledTimes(1)
    expect(setNameHandler).toHaveBeenCalledWith("John")
  })

  //   test("displays error helper text when error is true", () => {
  //     const error = { isError: true, message: "Invalid username" }
  //     render(
  //       <UsernameInput username="" setUsernameHandler={() => {}} error={error} />
  //     )

  //     const helperText = screen.getByText(/Invalid username/i)
  //     expect(helperText).toBeInTheDocument()
  //   })

  //   test("validates username correctly with validateUsername function", () => {
  //     expect(validateUsername("userWNum123")).toBe(true)
  //     expect(validateUsername("valid_Username")).toBe(true)
  //     expect(validateUsername("inv@lid_username")).toBe(false)
  //     expect(validateUsername("use")).toBe(false)
  //     expect(validateUsername("usernameIsTooLongToPass")).toBe(false)
  //     expect(validateUsername(undefined)).toBe(false)
  //   })
})
