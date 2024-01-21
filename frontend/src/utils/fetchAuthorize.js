/**
 * @description Fetch with Authorization. Passes the user's JWT token to the server.
 * @param {object} options - The options object for the fetch request.
 * @returns {object} - The updated options object with Authorization header.
 */
function updateOptions(options) {
  console.log("fetcherTest")
  const update = { ...options }
  if (localStorage.jwt) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.jwt}`
    }
  }
  return update
}

/**
 * @description Used as a replacement for fetch in the client.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The options object for the fetch request.
 * @returns {Promise<Response>} - The fetch response promise.
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options))
}
