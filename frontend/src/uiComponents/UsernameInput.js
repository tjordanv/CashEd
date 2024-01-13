/**
 * Represents the UsernameInput component.
 * @module UsernameInput
 */

import TextField from "@mui/material/TextField"
import classes from "./InputFields.module.css"
import FetchError from "../utils/fetchError"

/**
 * @description Represents the UsernameInput component.
 * @param {string} username - The current username value.
 * @param {Function} setUsernameHandler - The function to handle username changes.
 * @param {Object} error - The error object.
 * @param {boolean} error.isError - Indicates if there is an error.
 * @param {string} error.message - The error message.
 * @returns {JSX.Element} The rendered UsernameInput component.
 */
const UsernameInput = ({ username, setUsernameHandler, error }) => {
  return (
    <TextField
      required
      variant="outlined"
      label="Username"
      size="small"
      value={username}
      onChange={(e) => setUsernameHandler(e.target.value)}
      className={classes.inputField}
      error={error.isError}
      helperText={error.message}
    />
  )
}

UsernameInput.defaultProps = {
  error: { isError: false, message: "" }
}

export default UsernameInput

/**
 * @description Validates the username.
 * @param {string} username - The username to validate.
 * @returns {boolean} Returns true if the username is valid, false otherwise.
 */
const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9.,_-]{4,15}$/

  if (typeof username !== "string" || username.trim().length === 0) {
    return false
  }

  return regex.test(username.trim())
}
export { validateUsername }

/**
 * @description Checks the availability of a username.
 * @param {string} username - The username to check availability for.
 * @returns {boolean} a boolean value for whether the username is available or not false = username was found / true = username was not found.
 * @throws {FetchError} Throws a FetchError if there is an error in the availability response.
 */
const checkUsernameAvailability = async (username) => {
  const availabilityResponse = await fetch(
    `http://localhost:8080/auth/checkUsernameAvailability?${new URLSearchParams(
      { username: username }
    )}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  if (!availabilityResponse.ok) {
    throw await FetchError.fromResponse(availabilityResponse)
  } else if (availabilityResponse.status === 200) {
    return await availabilityResponse.json()
  }
}
export { checkUsernameAvailability }
