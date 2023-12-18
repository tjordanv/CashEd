import React from "react"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import PasswordResetForm from "./PasswordResetForm"
import { BrowserRouter } from "react-router-dom"

const setIsResetHandler = jest.fn()

const renderComponent = () => {
  render(
    <BrowserRouter>
      <PasswordResetForm setIsResetHandler={setIsResetHandler} />
    </BrowserRouter>
  )
}

const updateInputs = (invalidPassword, nonMatchingPassword) => {
  const passwordInput = screen.getAllByLabelText(/Password/i)[0]
  fireEvent.change(passwordInput, {
    target: { value: invalidPassword ? "ert" : "Password1!" }
  })
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
  fireEvent.change(confirmPasswordInput, {
    target: { value: nonMatchingPassword ? "fds" : "Password1!" }
  })

  return { passwordInput, confirmPasswordInput }
}

const submit = () => {
  const submitButton = screen.getByRole("button", { name: /reset password/i })
  fireEvent.click(submitButton)
}

describe("PasswordResetForm", () => {
  test("renders without crashing", () => {
    renderComponent()

    const passwordInput = screen.getAllByLabelText(/Password/i)[0]
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const submitButton = screen.getByRole("button", { name: /reset password/i })

    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test("submits the form correctly", async () => {
    renderComponent()
    updateInputs()
    submit()

    await waitFor(() => {
      expect(setIsResetHandler).toHaveBeenCalled()
    })
  })
  test("shows invalid password", async () => {
    renderComponent()
    updateInputs(true)
    submit()

    await waitFor(() => {
      expect(
        screen.getByText(/Password must contain at least one uppercase,/i)
      ).toBeInTheDocument()
    })
  })
  test("shows passwords do not match", async () => {
    renderComponent()
    updateInputs(false, true)
    submit()

    await waitFor(() => {
      expect(screen.getByText(/Passwords must match./i)).toBeInTheDocument()
    })
  })
  test("shows invalid password and passwords do not match", async () => {
    renderComponent()
    updateInputs(true, true)
    submit()

    await waitFor(() => {
      expect(
        screen.getByText(/Password must contain at least one uppercase,/i)
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText(/Passwords must match./i)).toBeInTheDocument()
    })
  })
})
