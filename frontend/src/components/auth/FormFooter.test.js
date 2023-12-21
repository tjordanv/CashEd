import { render, screen } from "@testing-library/react"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import FormFooter from "./FormFooter"

const renderContent = (props) => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <FormFooter
        topLink={props.topLink}
        bottomLink={props.bottomLink}
        doubleLink={props.doubleLink}
        tooltip={props.tooltip}
      />
    </MemoryRouter>
  )
}

describe("FormFooter", () => {
  test("renders a single top link without label", () => {
    const data = {
      topLink: {
        to: "/register",
        text: "Create an Account"
      }
    }

    renderContent(data)
    expect(
      screen.getByRole("link", { name: /Create an Account/i })
    ).toBeInTheDocument()
  })
  test("renders a single top link with label", () => {
    const data = {
      topLink: {
        to: "/register",
        text: "Create an Account",
        label: "Need an account?"
      }
    }

    renderContent(data)
    expect(screen.getByText(/Need an account?/i)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Create an Account/i })
    ).toBeInTheDocument()
  })
  test("renders a single bottom link without label", () => {
    const data = {
      bottomLink: {
        to: "/register",
        text: "Create an Account",
        label: "Need an account?"
      }
    }

    renderContent(data)
    expect(screen.getByText(/Need an account?/i)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Create an Account/i })
    ).toBeInTheDocument()
  })
  test("renders a single bottom top link with label", () => {
    const data = {
      bottomLink: {
        to: "/register",
        text: "Create an Account",
        label: "Need an account?"
      }
    }

    renderContent(data)
    expect(screen.getByText(/Need an account?/i)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Create an Account/i })
    ).toBeInTheDocument()
  })
  test("renders top and bottom link without labels", () => {
    const data = {
      topLink: {
        to: "/register",
        text: "Create an Account"
      },
      bottomLink: {
        to: "/login",
        text: "Cancel"
      }
    }
    renderContent(data)
    // Assert that the component renders without throwing any errors
    expect(
      screen.getByRole("link", { name: /Create an account?/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Cancel/i })).toBeInTheDocument()
  })
  test("renders top and bottom link with labels", () => {
    const data = {
      topLink: {
        to: "/register",
        text: "Create an Account",
        label: "Need an account?"
      },
      bottomLink: {
        to: "/login",
        text: "Cancel",
        label: "Already have an account?"
      }
    }
    renderContent(data)

    expect(
      screen.getByRole("link", { name: /Create an account?/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Cancel/i })).toBeInTheDocument()
    expect(screen.getByText(/Need an account?/i)).toBeInTheDocument()
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument()
  })
  test("renders top and bottom link with tooltip", () => {
    const data = {
      topLink: {
        to: "/register",
        text: "Create an Account"
      },
      bottomLink: {
        to: "/login",
        text: "Cancel"
      },
      tooltip: "This is a tooltip"
    }
    renderContent(data)
    // Assert that the component renders without throwing any errors
    expect(
      screen.getByRole("link", { name: /Create an account?/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Cancel/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/This is a tooltip/i)).toBeInTheDocument()
  })
  test("renders double link with tooltip", () => {
    const data = {
      doubleLink: {
        label: "Having trouble logging in?",
        firstLink: {
          to: "/userRecovery/forgotUsername",
          text: "Forgot Username"
        },
        secondLink: {
          to: "/userRecovery/forgotPassword",
          text: "Forgot Password"
        }
      },
      tooltip: "This is a tooltip"
    }
    renderContent(data)
    // Assert that the component renders without throwing any errors
    expect(screen.getByText(/Having trouble logging in?/i)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Forgot Username/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Forgot Password/i })
    ).toBeInTheDocument()
    expect(screen.getByLabeText(/This is a tooltip/i)).toBeInTheDocument()
  })
})
