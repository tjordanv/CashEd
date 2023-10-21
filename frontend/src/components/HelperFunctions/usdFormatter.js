const usdFormatter = (amount) => {
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  })

  return usd.format(amount)
}

export { usdFormatter }
