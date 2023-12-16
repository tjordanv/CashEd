/** @module inputError */

/**
 * @extends Error
 * @classdesc Represents an error that occurs with input validation.
 */
class InputError extends Error {
  /**
   * @constructor
   * @description Creates a new InputError instance.
   * @param {string} message - The error message.
   * @param {string} inputName - The name of the input associated with the error.
   */
  constructor(message, inputName) {
    super(message)
    this.name = "InputError"
    this.inputName = inputName
  }

  /**
   * @description Gets the name of the input associated with the error.
   * @returns {string} The input name.
   */
  getInputName() {
    return this.inputName
  }

  /**
   * @description Gets the error message.
   * @returns {string} The error message.
   */
  getMessage() {
    return this.message
  }
}

export { InputError }

/**
 * @function
 * @static
 * @description updates the given error inside of the given array of input errors, maintaining the state of the other errors
 * @param {object} error - the error that is being updated
 * @param {string} error.inputField - the name of the input field that is being updated
 * @param {boolean} error.isError - whether or not the input field has an error
 * @param {string} error.message - the error message that will be displayed to the user
 * @param {function} setErrorsHandler - the useState setter that controls the error state in the parent
 */
const setError = (error, setErrorHandler) => {
  setErrorHandler((prevState) => ({
    ...prevState,
    [error.inputField]: { isError: error.isError, message: error.message }
  }))
}

export { setError }

/**
 * @function
 * @static
 * @description Resets the given array of input errors, clearing all of the error states and setting them to not show any errors
 * @param {array} errors - the array of errors that are being reset
 * @param {function} setErrorsHandler - the useState setter that controls the error state in the parent
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
