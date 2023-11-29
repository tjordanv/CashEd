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
