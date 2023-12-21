import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UserLookup from "./UserLookup"
import { BrowserRouter } from "react-router-dom"

const setUserHandler = jest.fn()

const renderComponent = (isPasswordReset) => {
  render(
    <BrowserRouter>
      <UserLookup
        setUserHandler={setUserHandler}
        isPasswordReset={isPasswordReset}
      />
    </BrowserRouter>
  )
}
const updateInputs = (isPasswordReset, invalidEmail, invalidUsername) => {
  const emailInput = screen.getByRole("textbox", { name: /Email/i })
  fireEvent.change(emailInput, {
    target: { value: invalidEmail ? "new@email.com" : "taken@email.com" }
  })

  let usernameInput
  if (isPasswordReset) {
    usernameInput = screen.getByRole("textbox", { name: /username/i })
    fireEvent.change(usernameInput, {
      target: { value: invalidUsername ? "badUser" : "user" }
    })
  }
  return { emailInput, usernameInput }
}

const submit = () => {
  const submitButton = screen.getByRole("button", { name: /Next/i })
  fireEvent.click(submitButton)
}

describe("UserLookup", () => {
  test("renders UserLookup component", () => {
    renderComponent(false)

    const emailInput = screen.getByRole("textbox", { name: /Email Address/i })
    const nextButton = screen.getByRole("button", { name: /Next/i })
    expect(emailInput).toBeInTheDocument()
    expect(screen.queryByText(/username/i)).toBeNull()
    expect(nextButton).toBeInTheDocument()
  })
  test("renders UserLookup component for password reset", () => {
    renderComponent(true)

    const emailInput = screen.getByRole("textbox", { name: /Email Address/i })
    const usernameInput = screen.getByRole("textbox", { name: /Username/i })
    const nextButton = screen.getByRole("button", { name: /Next/i })
    expect(emailInput).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  test("calls setUserHandler when form is submitted (password reset)", async () => {
    const isPasswordReset = true
    renderComponent(isPasswordReset)

    const { emailInput, usernameInput } = updateInputs(isPasswordReset)
    submit()

    await waitFor(() => {
      expect(setUserHandler).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(setUserHandler).toHaveBeenCalledWith({
        email: emailInput.value,
        username: usernameInput.value,
        id: 2
      })
    })
  })
  test("calls setUserHandler when form is submitted", async () => {
    const isPasswordReset = false
    renderComponent(isPasswordReset)

    const { emailInput } = updateInputs(isPasswordReset)
    submit()

    await waitFor(() => {
      expect(setUserHandler).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(setUserHandler).toHaveBeenCalledWith({
        email: emailInput.value,
        username: "",
        id: 1
      })
    })
  })
  test("shows email not found", async () => {
    const isPasswordReset = false
    renderComponent(isPasswordReset)

    updateInputs(isPasswordReset, true)
    submit()

    await waitFor(() => {
      expect(screen.getByText(/Email not found./i)).toBeInTheDocument()
    })
  })
  test("shows username not found", async () => {
    const isPasswordReset = true
    renderComponent(isPasswordReset)

    updateInputs(isPasswordReset, false, true)
    submit()

    await waitFor(() => {
      expect(screen.getByText(/User not found./i)).toBeInTheDocument()
    })
  })
})
