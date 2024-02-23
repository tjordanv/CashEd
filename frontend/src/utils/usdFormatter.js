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

  if (amount === 0) {
    return "$0.00"
  }

  if (typeof amount === "number") {
    return usd.format(amount)
  }

  const parsedAmount = parseFloat(amount)
  if (isNaN(parsedAmount)) {
    throw new Error("Invalid amount")
  }

  return usd.format(parsedAmount)
}

export { usdFormatter }
