import { usdFormatter } from "./usdFormatter.js"

describe("usdFormatter", () => {
  test("usdFormatter should be defined", () => {
    expect(usdFormatter).toBeDefined()
  })
  test("usdFormatter should format positive amount correctly", () => {
    const amount = 1234.56
    const formattedAmount = usdFormatter(amount)
    expect(formattedAmount).toBe("$1,234.56")
  })

  test("usdFormatter should format negative amount correctly", () => {
    const amount = -9876.54
    const formattedAmount = usdFormatter(amount)
    expect(formattedAmount).toBe("-$9,876.54")
  })

  test("usdFormatter should format zero amount correctly", () => {
    const amount = 0
    const formattedAmount = usdFormatter(amount)
    expect(formattedAmount).toBe("$0.00")
  })
})
