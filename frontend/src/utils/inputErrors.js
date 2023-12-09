/**
 * A custom Error object that can be linked to a specific input field.
 * @param {string} message the error message
 * @param {string} [inputName] the name of the input that is throwing the error
 * @returns a new Error
 */
class InputError extends Error {
  constructor(message, inputName) {
    super(message)
    this.name = "InputError"
    this.inputName = inputName
  }

  getInputName() {
    return this.inputName
  }

  getMessage() {
    return this.message
  }
}

export { InputError }

/**
 * updates the given error inside of an array of input errors, maintaining the state of the other errors
 * @param {object} error the error that is being updated
 * @param {function} setErrorsHandler the useState setter that controls the error state in the parent
 */
const setError = (error, setErrorHandler) => {
  setErrorHandler((prevState) => ({
    ...prevState,
    [error.inputField]: { isError: error.isError, message: error.message }
  }))
}

export { setError }

/**
 * Resets an array of input errors, clearing all of the error states and setting them to not show any errors
 * @param {array} errors the array of errors that are being reset
 * @param {function} setErrorsHandler the useState setter that controls the error state in the parent
 */
const resetErrors = (errors, setErrorsHandler) => {
  // reset any previous errors upon resubmission
  const tempErrors = { ...errors }
  for (const errorKey in tempErrors) {
    tempErrors[errorKey] = {
      isError: false,
      message: ""
    }
  }
  setErrorsHandler(tempErrors)
}

export { resetErrors }
