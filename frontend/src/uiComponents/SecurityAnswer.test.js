import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import SecurityQuestionAnswer from "./SecurityAnswer"

const setAnswerHandler = jest.fn()
const renderComponent = ({ answer = "", error }) => {
  render(
    <SecurityQuestionAnswer
      answer={answer}
      setAnswerHandler={setAnswerHandler}
      error={error}
    />
  )
}

describe("SecurityQuestionAnswer", () => {
  test("renders the input field with correct value", () => {
    renderComponent({ answer: "test answer" })
    const inputElement = screen.getByLabelText(/Answer/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("test answer")
  })

  test("calls the setAnswerHandler when input changes", () => {
    renderComponent({})

    const inputElement = screen.getByLabelText(/Answer/i)
    fireEvent.change(inputElement, { target: { value: "new answer" } })

    expect(setAnswerHandler).toHaveBeenCalledTimes(1)
    expect(setAnswerHandler).toHaveBeenCalledWith("new answer")
  })

  test("displays error helper text when error is true", () => {
    const error = { isError: true, message: "Invalid answer" }
    renderComponent({ error: error })

    const helperText = screen.getByText(/Invalid answer/i)
    expect(helperText).toBeInTheDocument()
  })

  test("displays the character count at the end of the input", () => {
    renderComponent({ answer: "test answer" })

    const characterCount = screen.getByText(/11\/40/i)
    expect(characterCount).toBeInTheDocument()
  })

  test("limits the input to 40 characters", () => {
    renderComponent({ answer: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })

    const inputElement = screen.getByLabelText(/Answer/i)
    let counter = 0
    while (counter < 50) {
      fireEvent.change(inputElement, {
        target: { value: "a" }
      })
      counter++
    }

    expect(inputElement).toHaveAttribute("maxLength", "40")
    expect(inputElement).toHaveValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    expect(setAnswerHandler).toHaveBeenCalledTimes(50)
  })
})
