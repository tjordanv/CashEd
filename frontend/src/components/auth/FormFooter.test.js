import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import FormFooter from "./FormFooter"

describe("FormFooter", () => {
  it("renders without errors", () => {
    render(
      <BrowserRouter>
        <FormFooter />
      </BrowserRouter>
    )
    // Assert that the component renders without throwing any errors
    expect(screen.getByTestId("form-footer")).toBeInTheDocument()
  })

  it("renders a single top link", () => {
    const topLink = {
      to: "/register",
      text: "Create an Account",
      label: "Need an account?"
    }

    render(
      <BrowserRouter>
        <FormFooter topLink={topLink} />
      </BrowserRouter>
    )

    // Assert that the top link is rendered
    expect(screen.getByText(topLink.label)).toBeInTheDocument()
    expect(screen.getByText(topLink.text)).toBeInTheDocument()
    expect(screen.getByTestId("form-footer-top-link")).toHaveAttribute(
      "href",
      topLink.to
    )
  })

  it("renders a single bottom link", () => {
    const bottomLink = {
      to: "/login",
      text: "Cancel",
      label: "Go back to login"
    }

    render(
      <BrowserRouter>
        <FormFooter bottomLink={bottomLink} />
      </BrowserRouter>
    )

    // Assert that the bottom link is rendered
    expect(screen.getByText(bottomLink.label)).toBeInTheDocument()
    expect(screen.getByText(bottomLink.text)).toBeInTheDocument()
    expect(screen.getByTestId("form-footer-bottom-link")).toHaveAttribute(
      "href",
      bottomLink.to
    )
  })

  it("renders a double link", () => {
    const doubleLink = {
      label: "Having trouble logging in?",
      firstLink: {
        to: "/userRecovery/forgotUsername",
        text: "Forgot Username"
      },
      secondLink: {
        to: "/userRecovery/forgotPassword",
        text: "Forgot Password"
      }
    }

    render(
      <BrowserRouter>
        <FormFooter doubleLink={doubleLink} />
      </BrowserRouter>
    )

    // Assert that the double link is rendered
    expect(screen.getByText(doubleLink.label)).toBeInTheDocument()
    expect(screen.getByText(doubleLink.firstLink.text)).toBeInTheDocument()
    expect(screen.getByText(doubleLink.secondLink.text)).toBeInTheDocument()
    expect(screen.getByTestId("form-footer-first-link")).toHaveAttribute(
      "href",
      doubleLink.firstLink.to
    )
    expect(screen.getByTestId("form-footer-second-link")).toHaveAttribute(
      "href",
      doubleLink.secondLink.to
    )
  })
})
