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

export default InputError
