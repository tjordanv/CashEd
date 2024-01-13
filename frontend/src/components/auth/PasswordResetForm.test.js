import React from "react"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import PasswordResetForm from "./PasswordResetForm"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { act } from "react-dom/test-utils"

const setIsResetHandler = jest.fn()

// The component must us the MemoryRouter since it makes use of the useLoaderData hook, which requires a data/memory router.
const renderComponent = () => {
  const data = { token: "ijhbuij3b4uih", id: "1" }
  const routes = [
    {
      path: "/passwordReset",
      element: <PasswordResetForm setIsResetHandler={setIsResetHandler} />,
      loader: () => data
    }
  ]

  const router = createMemoryRouter(routes, {
    initialEntries: ["/passwordReset"]
  })

  render(<RouterProvider router={router} />)
}

const updateInputs = async (invalidPassword, nonMatchingPassword) => {
  let passwordInput
  let confirmPasswordInput
  await waitFor(() => {
    passwordInput = screen.getAllByLabelText(/Password/i)[0]
    confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
  })

  fireEvent.change(confirmPasswordInput, {
    target: { value: nonMatchingPassword ? "fds" : "newPassword1!" }
  })
  fireEvent.change(passwordInput, {
    target: { value: invalidPassword ? "ert" : "newPassword1!" }
  })

  return { passwordInput, confirmPasswordInput }
}

const submit = async () => {
  let submitButton
  await waitFor(() => {
    submitButton = screen.getByRole("button", { name: /reset password/i })
  })
  fireEvent.click(submitButton)
}

describe("PasswordResetForm", () => {
  // tests must be async since the loader function in the router is async
  test("renders without crashing", async () => {
    renderComponent()
    await waitFor(() => {
      const passwordInput = screen.getAllByLabelText(/Password/i)[0]
      const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
      const submitButton = screen.getByRole("button", {
        name: /reset password/i
      })

      // it is alright to have multiple assertions in a single waitFor statement if they are related, as is the case here.
      expect(passwordInput).toBeInTheDocument()
      expect(confirmPasswordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })
  })

  test("submits the form correctly", async () => {
    renderComponent()
    act(() => {
      updateInputs()
      submit()
    })

    await waitFor(() => {
      expect(setIsResetHandler).toHaveBeenCalled()
    })
  })
  test("shows invalid password", async () => {
    renderComponent()
    act(() => {
      updateInputs(true)
      submit()
    })
    await waitFor(() => {
      expect(
        screen.getByText(/Password must contain at least one uppercase,/i)
      ).toBeInTheDocument()
    })
  })
  test("shows passwords do not match", async () => {
    renderComponent()
    act(() => {
      updateInputs(false, true)
      submit()
    })
    await waitFor(() => {
      expect(screen.getByText(/Passwords must match./i)).toBeInTheDocument()
    })
  })
  test("shows invalid password and passwords do not match", async () => {
    renderComponent()
    act(() => {
      updateInputs(true, true)
      submit()
    })
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
