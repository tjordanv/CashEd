import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterFormPt1 from "./RegisterFormPt1"
import { BrowserRouter } from "react-router-dom"

const submitHandler = jest.fn()

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RegisterFormPt1
        submitHandler={submitHandler}
        user={{ emailAddress: "", password: "", confirmPassword: "" }}
      />
    </BrowserRouter>
  )
}
const updateInputs = (emailTaken, invalidPassword, nonMatchingPassword) => {
  const emailInput = screen.getByLabelText(/Email Address/i)
  fireEvent.change(emailInput, {
    target: { value: emailTaken ? "taken@email.com" : "email@mail.com" }
  })
  const passwordInput = screen.getAllByLabelText(/Password/i)[0]
  fireEvent.change(passwordInput, {
    target: { value: invalidPassword ? "ert" : "Password1!" }
  })
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
  fireEvent.change(confirmPasswordInput, {
    target: { value: nonMatchingPassword ? "fds" : "Password1!" }
  })

  return { emailInput, passwordInput, confirmPasswordInput }
}

describe("RegisterFormPt1", () => {
  test("renders all elements", () => {
    renderComponent()
    const emailInput = screen.getByLabelText(/Email Address/i)
    expect(emailInput).toBeInTheDocument()
    const passwordInput = screen.getAllByLabelText(/Password/i)[0]
    expect(passwordInput).toBeInTheDocument()
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    expect(confirmPasswordInput).toBeInTheDocument()
    const submitButton = screen.getByRole("button", { name: /next/i })
    expect(submitButton).toBeInTheDocument()
  })

  test("receives input", () => {
    renderComponent()

    const { emailInput, passwordInput, confirmPasswordInput } = updateInputs()

    expect(emailInput).toHaveValue("email@mail.com")
    expect(passwordInput).toHaveValue("Password1!")
    expect(confirmPasswordInput).toHaveValue("Password1!")
  })

  test("calls submitHandler when form is submitted", async () => {
    renderComponent()
    const email = updateInputs().emailInput
    console.log(email.value)

    const submitButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalled()
    })
  })

  test("shows email taken", async () => {
    renderComponent()
    updateInputs({ emailTaken: true })

    const submitButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Email address already taken./i)
      ).toBeInTheDocument()
    })
  })

  test("shows password is invalid", async () => {
    renderComponent()
    updateInputs(false, true)

    const submitButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(
          /Password must contain at least one uppercase, one number, one special character/i
        )
      ).toBeInTheDocument()
    })
  })

  test("shows passwords must match", async () => {
    renderComponent()
    updateInputs(false, false, true)

    const submitButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Passwords must match./i)).toBeInTheDocument()
    })
  })
})
