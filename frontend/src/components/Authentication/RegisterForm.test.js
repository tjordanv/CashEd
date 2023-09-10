import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterForm from "./RegisterForm"
import { server } from "../../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

let mockParentStateFormSection = "register one"
const setUserHandlerMock = jest.fn()
/*if this does not work, when formSection should be changing, check that the mockHandler was called with the 
correct value. If so, render form section 2 by setting form section to 2. This can be done by giving the render component function
a form section prop to pass when called.
*/
const setFormSectionHandlerMock = ({ section }) => {
  mockParentStateFormSection = section
  return jest.fn()
}
const renderComponent = () => {
  /*The RegisterForm must be wrapped in the BrowserRouter since it contains a NavLink. 
    The NavLink uses useLocation hook which only works in the context of a router */
  render(
    <BrowserRouter>
      <RegisterForm
        setUserHandler={setUserHandlerMock}
        formSection={mockParentStateFormSection}
        setFormSection={setFormSectionHandlerMock}
      />
    </BrowserRouter>
  )
}
const completePartOne = () => {
  const emailInput = screen.getByLabelText(/Email Address/i)
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
  const passwordInput = screen.getAllByLabelText(/password/i)[0]
  const nextButton = screen.getByText(/Next/i)

  fireEvent.change(emailInput, { target: { value: "test@email.com" } })
  fireEvent.change(passwordInput, { target: { value: "Test123$" } })
  fireEvent.change(confirmPasswordInput, { target: { value: "Test123$" } })
  fireEvent.click(nextButton)
}

describe("RegisterForm component", () => {
  test("renders part 1 form fields", () => {
    renderComponent()

    const emailInput = screen.getByLabelText(/Email Address/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const nextButton = screen.getByText(/Next/i)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })
  test("Receives part 1 input.", () => {
    renderComponent()

    const emailInput = screen.getByLabelText(/Email Address/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const passwordInput = screen.getAllByLabelText(/password/i)[0]

    fireEvent.change(emailInput, { target: { value: "test@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Test123$" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "Test123$" } })

    expect(emailInput).toHaveValue("test@email.com")
    expect(passwordInput).toHaveValue("Test123$")
    expect(confirmPasswordInput).toHaveValue("Test123$")
  })
  test("Shows email taken", async () => {
    renderComponent()

    const emailInput = screen.getByLabelText(/Email Address/i)
    const nextButton = screen.getByText(/Next/i)

    fireEvent.change(emailInput, { target: { value: "taken@email.com" } })
    fireEvent.click(nextButton)

    // Wait for async operations to complete
    await waitFor(() => {
      expect(
        screen.getByText(/Email address already taken./i)
      ).toBeInTheDocument()
    })
  })
  test("Shows email is available", async () => {
    renderComponent()

    const emailInput = screen.getByLabelText(/Email Address/i)
    const nextButton = screen.getByText(/next/i)

    fireEvent.change(emailInput, { target: { value: "test@email.com" } })
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.queryByText(/Email address already taken./i)).toBeNull()
    })
  })
  test("renders part 2 form fields", async () => {
    renderComponent()
    completePartOne()

    let usernameInput = null
    let firstNameInput = null
    let lastNameInput = null
    let submitButton = null

    await waitFor(() => {
      usernameInput = screen.getByLabelText(/Username/i)
      firstNameInput = screen.getByLabelText(/First Name/i)
      lastNameInput = screen.getByLabelText(/Last Name/i)
      submitButton = screen.getByText(/Create Account/i)
    })
    expect(usernameInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  test("Receives part 2 input.", async () => {
    renderComponent()
    completePartOne()

    let usernameInput = null
    let firstNameInput = null
    let lastNameInput = null

    await waitFor(() => {
      usernameInput = screen.getByLabelText(/Username/i)
      firstNameInput = screen.getByLabelText(/First Name/i)
      lastNameInput = screen.getByLabelText(/Last Name/i)
    })

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })

    expect(usernameInput).toHaveValue("user")
    expect(firstNameInput).toHaveValue("John")
    expect(lastNameInput).toHaveValue("Doe")
  })
  test("Shows username taken", async () => {
    renderComponent()
    completePartOne()

    let usernameInput = null
    let firstNameInput = null
    let lastNameInput = null
    let submitButton = null

    await waitFor(() => {
      usernameInput = screen.getByLabelText(/username/i)
      firstNameInput = screen.getByLabelText(/First Name/i)
      lastNameInput = screen.getByLabelText(/Last Name/i)
      submitButton = screen.getByText(/Create Account/i)
    })

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Username already taken./i)).toBeInTheDocument()
    })
  })
  test("Shows username is available", async () => {
    renderComponent()
    completePartOne()

    let usernameInput = null
    let firstNameInput = null
    let lastNameInput = null
    let submitButton = null

    await waitFor(() => {
      usernameInput = screen.getByLabelText(/username/i)
      firstNameInput = screen.getByLabelText(/First Name/i)
      lastNameInput = screen.getByLabelText(/Last Name/i)
      submitButton = screen.getByText(/Create Account/i)
    })

    fireEvent.change(usernameInput, { target: { value: "newUser" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(/Username already taken./i)).toBeNull()
    })
  })
  test("form can be submitted and accepted", async () => {
    renderComponent()
    completePartOne()

    let usernameInput = null
    let firstNameInput = null
    let lastNameInput = null
    let submitButton = null

    await waitFor(() => {
      usernameInput = screen.getByLabelText(/Username/i)
      firstNameInput = screen.getByLabelText(/First Name/i)
      lastNameInput = screen.getByLabelText(/Last Name/i)
      submitButton = screen.getByText(/Create Account/i)
    })

    fireEvent.change(usernameInput, { target: { value: "newUser" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })
    fireEvent.click(submitButton)

    let isCreated = false

    await waitFor(() => {
      isCreated = sessionStorage.getItem("isCreated")
    })
    expect(isCreated).toEqual("true")
    expect(setUserHandlerMock).toBeCalled()
  })
})
