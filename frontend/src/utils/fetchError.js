/**
 * A custom Error object that is based on a HTTP response with an error code.
 * @param {string} message the error message
 * @param {integer} statusCode the status code returned by the response
 */
class FetchError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "FetchError"
    this.statusCode = statusCode
  }

  /**
   * takes the response with an error status code and converts it to a fetch error.
   * The error contains the message coming from the server.
   * @param {Object} response an HTTP response with an error status code
   * @returns new FetchError
   */
  static async fromResponse(response) {
    const errorMessage = await response.text()
    return new FetchError(errorMessage, response.status)
  }
}

export default FetchError
