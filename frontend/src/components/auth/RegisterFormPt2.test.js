import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterFormPt2 from "./RegisterFormPt2"

const submitHandler = jest.fn()
const backHandler = jest.fn()

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RegisterFormPt2
        submitHandler={submitHandler}
        backHandler={backHandler}
        user={{
          username: "",
          firstName: "",
          lastName: "",
          emailAddress: "",
          password: ""
        }}
      />
    </BrowserRouter>
  )
}

const updateInputs = (invalidUsername, usernameTaken, invalidName) => {
  const usernameInput = screen.getByLabelText(/username/i)
  fireEvent.change(usernameInput, {
    target: {
      value: invalidUsername ? "no" : usernameTaken ? "user" : "validUsername"
    }
  })
  const firstNameInput = screen.getByLabelText(/First Name/i)
  fireEvent.change(firstNameInput, {
    target: { value: invalidName ? "sdf344r" : "John" }
  })
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  fireEvent.change(lastNameInput, {
    target: { value: "Doe" }
  })

  return {
    usernameInput,
    firstNameInput,
    lastNameInput
  }
}

const submit = () => {
  const submitButton = screen.getByRole("button", { name: /create account/i })
  fireEvent.click(submitButton)
}

describe("RegisterFormPt2", () => {
  test("renders without errors", () => {
    renderComponent()
    const usernameInput = screen.getByLabelText(/Username/i)
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/)
    const submitButton = screen.getByText(/Create Account/)

    expect(usernameInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test("calls backHandler when back button is clicked", () => {
    renderComponent()
    const backButton = screen.getByText(/Back/i)
    fireEvent.click(backButton)
    expect(backHandler).toHaveBeenCalled()
  })

  test("calls submitHandler when form is submitted", async () => {
    renderComponent()
    updateInputs()
    submit()

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalled()
    })
  })
  test("shows username taken", async () => {
    renderComponent()
    updateInputs(false, true)
    submit()

    await waitFor(() => {
      expect(screen.getByText(/Username already taken./i)).toBeInTheDocument()
    })
  })
  test("shows username is invalid", () => {
    renderComponent()
    updateInputs(true)
    submit()

    expect(
      screen.getByText(/Username must be between 4 and 15 characters./i)
    ).toBeInTheDocument()
  })
  test("shows name is invalid", async () => {
    renderComponent()
    updateInputs(false, false, true)
    submit()

    await waitFor(() => {
      expect(
        screen.getByText(/First name can only contain letters/i)
      ).toBeInTheDocument()
    })
  })
})
