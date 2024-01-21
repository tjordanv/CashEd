import { InputError, setError, resetErrors } from "./inputErrors.js"

describe("InputError", () => {
  const message = "Error message"
  const inputName = "inputField"

  test("Creates a new FetchError instance", () => {
    const error = new InputError(message, inputName)

    expect(error).toBeInstanceOf(InputError)
    expect(error.message).toBe(message)
    expect(error.inputName).toBe(inputName)
  })

  test("error returns input name and error message", () => {
    const error = new InputError(message, inputName)

    expect(error.getInputName()).toBe(inputName)
    expect(error.getMessage()).toBe(message)
  })
  test("setError updates the error state", () => {
    const error = new InputError(message, inputName)
    const setErrorsHandler = jest.fn()
    setError(error, setErrorsHandler)

    expect(setErrorsHandler).toHaveBeenCalledTimes(1)
  })
  test("resetErrors resets the error state", () => {
    const error = new InputError(message, inputName)
    const setErrorsHandler = jest.fn()
    resetErrors(error, setErrorsHandler)

    expect(setErrorsHandler).toHaveBeenCalledTimes(1)
  })
})
