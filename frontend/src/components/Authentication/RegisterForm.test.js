import React from "react"
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterForm from "./RegisterForm"
import { server } from "../../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

let mockParentStateFormSection = "register one"

// mock the parent state updating
const setFormSectionHandlerMock = (section) => {
  mockParentStateFormSection = section
}

const setUserHandlerMock = jest.fn()

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
const completePartOne = async () => {
  const emailInput = screen.getByLabelText(/Email Address/i)
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
  const passwordInput = screen.getAllByLabelText(/password/i)[0]
  const nextButton = screen.getByText(/Next/i)

  fireEvent.change(emailInput, { target: { value: "test@email.com" } })
  fireEvent.change(passwordInput, { target: { value: "Test123$" } })
  fireEvent.change(confirmPasswordInput, { target: { value: "Test123$" } })
  fireEvent.click(nextButton)

  /* since the state is being set indirectly through the next button click, there is not promise returned in this function
   so the test is not waiting for it (registerHandlerPartOne => components/RegisterForm) to finish before moving on. 
   This timer provides enough time for the req/res cycle to finish*/
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
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
    await completePartOne()
    renderComponent()
    const usernameInput = screen.getByLabelText(/Username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submitButton = screen.getByText(/Create Account/i)

    expect(usernameInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  test("Receives part 2 input.", async () => {
    /* since the previous test updated the "parent state", causing the section 2 state to be rendered,
    we do not need to worry about completing section 1 again */
    renderComponent()

    const usernameInput = screen.getByLabelText(/Username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)

    fireEvent.change(usernameInput, { target: { value: "user" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })

    expect(usernameInput).toHaveValue("user")
    expect(firstNameInput).toHaveValue("John")
    expect(lastNameInput).toHaveValue("Doe")
  })
  test("Shows username taken", async () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submitButton = screen.getByText(/Create Account/i)

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

    const usernameInput = screen.getByLabelText(/username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submitButton = screen.getByText(/Create Account/i)

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

    const usernameInput = screen.getByLabelText(/Username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submitButton = screen.getByText(/Create Account/i)

    fireEvent.change(usernameInput, { target: { value: "newUser" } })
    fireEvent.change(firstNameInput, { target: { value: "John" } })
    fireEvent.change(lastNameInput, { target: { value: "Doe" } })
    fireEvent.click(submitButton)

    let isCreated = false

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    await waitFor(() => {
      isCreated = sessionStorage.getItem("isCreated")
    })
    expect(isCreated).toEqual("true")
    expect(setUserHandlerMock).toBeCalled()
  })
})
