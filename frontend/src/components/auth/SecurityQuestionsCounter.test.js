import { render, screen } from "@testing-library/react"
import SecurityQuestionsCounter from "./SecurityQuestionsCounter"

describe("SecurityQuestionsCounter", () => {
  it("should display the correct count", () => {
    const count = 3
    render(<SecurityQuestionsCounter count={count} />)
    const countElement = screen.getByText(`${count} / 3`)
    expect(countElement).toBeInTheDocument()
  })
})
