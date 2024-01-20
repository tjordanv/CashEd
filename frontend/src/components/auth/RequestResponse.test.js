import { render, screen } from "@testing-library/react"
import RequestResponse from "./RequestResponse"
import { BrowserRouter } from "react-router-dom"

const renderComponent = (type) => {
  render(
    <BrowserRouter>
      <RequestResponse type={type} />
    </BrowserRouter>
  )
}
describe("RequestResponse", () => {
  test("renders user recovery message", () => {
    renderComponent("user recovery")
    expect(
      screen.getByText(/Thank you for confirming your account./i)
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    expect(screen.queryByText(/register/i)).toBeNull()
  })

  test("renders password reset message", () => {
    renderComponent("password reset")
    expect(
      screen.getByText(/Your password has been successfully updated/i)
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    expect(screen.queryByText(/register/i)).toBeNull()
  })

  test("renders contact us message", () => {
    renderComponent("contact us")
    expect(
      screen.getByText(/Thank you for contacting us!/i)
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    expect(screen.getByText(/register/i)).toBeInTheDocument()
  })

  test("show error message error if invalid 'type' prop is used to render component", () => {
    renderComponent()
    expect(
      screen.getByText(/System error. Please contact site administrators./i)
    ).toBeInTheDocument()
  })
})
