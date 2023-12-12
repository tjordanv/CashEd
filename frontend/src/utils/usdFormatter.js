/**
 * @function usdFormatter
 * @description Formats the given amount as a USD string.
 * @param {number} amount - The amount to be formatted.
 * @returns {string} The formatted USD string.
 */

const usdFormatter = (amount) => {
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  })

  return usd.format(amount)
}

export { usdFormatter }
