// Note: Fetch with Authorization. Passes the user's JWT token to the server.
function updateOptions(options) {
  const update = { ...options }
  if (localStorage.jwt) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.jwt}`
    }
  }
  return update
}

// Used as a replacement for fetch in the client.
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options))
}
