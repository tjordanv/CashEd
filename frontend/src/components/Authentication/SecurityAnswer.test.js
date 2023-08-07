import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import SecurityQuestionAnswer from "./SecurityAnswer"

describe("SecurityQuestionAnswer", () => {
  test("renders the input field with correct value", () => {
    const setAnswerHandler = jest.fn()
    render(
      <SecurityQuestionAnswer
        answer="test answer"
        setAnswerHandler={setAnswerHandler}
      />
    )

    const inputElement = screen.getByLabelText(/Answer/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("test answer")
  })

  test("calls the setAnswerHandler when input changes", () => {
    const setAnswerHandler = jest.fn()
    render(
      <SecurityQuestionAnswer answer="" setAnswerHandler={setAnswerHandler} />
    )

    const inputElement = screen.getByLabelText(/Answer/i)
    fireEvent.change(inputElement, { target: { value: "new answer" } })

    expect(setAnswerHandler).toHaveBeenCalledTimes(1)
    expect(setAnswerHandler).toHaveBeenCalledWith("new answer")
  })

  test("displays error helper text when error is true", () => {
    const error = { isError: true, message: "Invalid answer" }
    render(
      <SecurityQuestionAnswer
        answer=""
        setAnswerHandler={() => {}}
        error={error}
      />
    )

    const helperText = screen.getByText(/Invalid answer/i)
    expect(helperText).toBeInTheDocument()
  })

  test("displays the character count at the end of the input", () => {
    render(<SecurityQuestionAnswer answer="test" setAnswerHandler={() => {}} />)

    const characterCount = screen.getByText(/4\/40/i)
    expect(characterCount).toBeInTheDocument()
  })

  test("limits the input to 40 characters", () => {
    const setAnswerHandler = jest.fn()
    render(
      <SecurityQuestionAnswer
        answer="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        setAnswerHandler={setAnswerHandler}
      />
    )

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
