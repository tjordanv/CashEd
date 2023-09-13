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
  test("displays error helper text when error is true", () => {
    const error = { isError: true, message: "Invalid name" }
    renderComponent({ error: error })

    const helperText = screen.getByText(/Invalid name/i)
    expect(helperText).toBeInTheDocument()
  })
  test("validates name correctly with validateName function", () => {
    expect(validateName("userWNum")).toBe(true)
    expect(validateName("validname")).toBe(true)
    expect(validateName("use")).toBe(true)
    expect(validateName("inv@lid_name")).toBe(false)
    expect(validateName("cantHaveNums123")).toBe(false)
    expect(
      validateName("thisNameIsWayWayTooLongToPassTheTestThatTestsItsLength")
    ).toBe(false)
    expect(validateName(undefined)).toBe(false)
  })
  test("limits the input to 40 characters", () => {
    renderComponent({ name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })

    const inputElement = screen.getByLabelText(/Name/i)
    let counter = 0
    while (counter < 50) {
      fireEvent.change(inputElement, {
        target: { value: "a" }
      })
      counter++
    }

    expect(inputElement).toHaveAttribute("maxLength", "40")
    expect(inputElement).toHaveValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    expect(setNameHandler).toHaveBeenCalledTimes(50)
  })
})
