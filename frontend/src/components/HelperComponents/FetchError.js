class FetchError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "FetchError"
    this.statusCode = statusCode
  }

  static async fromResponse(response) {
    const errorMessage = await response.text()
    return new FetchError(errorMessage, response.status)
  }
}

export default FetchError
