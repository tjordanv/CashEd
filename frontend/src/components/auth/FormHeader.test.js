import { render, screen } from "@testing-library/react"
import FormHeader from "./FormHeader"

describe("FormHeader", () => {
  it("renders the correct page title", () => {
    const pageTitle = "Login"
    render(<FormHeader pageTitle={pageTitle} />)
    const titleElement = screen.getByText(pageTitle)
    expect(titleElement).toBeInTheDocument()
  })
})
