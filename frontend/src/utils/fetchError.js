/**
 * @class FetchError
 * @extends Error
 * @classdesc A custom Error object that is based on a HTTP response with an error code.
 */
class FetchError extends Error {
  /**
   * @constructor
   * @description Creates a new FetchError instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message, statusCode) {
    super(message)
    this.name = "FetchError"
    this.statusCode = statusCode
  }

  /**
   * @description takes the response with an error status code and converts it to a fetch error. The error contains the message coming from the server.
   * @param {Object} response - an HTTP response with an error status code
   * @returns new FetchError
   */
  static async fromResponse(response) {
    const errorMessage = await response.text()
    return new FetchError(errorMessage, response.status)
  }
}

export default FetchError
