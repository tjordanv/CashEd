import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import SecurityQandA from "./SecurityQandA"

const setIsAuthenticatedHandler = jest.fn()

const renderComponent = (props) => {
  const routes = [
    {
      path: "/",
      element: <h1>home</h1>
    },
    {
      path: "/securityQandA",
      element: (
        <SecurityQandA
          type={props.type}
          user={props.user}
          setIsAuthenticatedHandler={setIsAuthenticatedHandler}
        />
      )
    }
  ]
  const router = createMemoryRouter(routes, {
    initialEntries: ["/securityQandA"]
  })

  render(<RouterProvider router={router} />)
}
const updateInputs = async (invalidAnswer) => {
  const securityQuestionInput = await screen.findByRole("button", {
    name: /Question/i
  })

  // Open the select dropdown
  fireEvent.mouseDown(securityQuestionInput)

  // wait for the dropdown to open then click an option
  const option = await screen.findByText("What is your favorite color?")
  fireEvent.click(option)

  const securityAnswerInput = await screen.findByRole("textbox", {
    name: /Answer/i
  })
  fireEvent.change(securityAnswerInput, {
    target: { value: invalidAnswer ? "test answer" : "correct answer" }
  })

  return { securityQuestionInput, securityAnswerInput }
}
const submit = () => {
  const submitButton = screen.getByRole("button", { name: /Submit/i })
  fireEvent.click(submitButton)
}

describe("SecurityQandA", () => {
  // these need to be async bc the security questions component used fetches the questions from the server on render
  test("renders question and answer form", async () => {
    renderComponent({ type: "register", user: null })

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Question/i })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /Answer/i })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument()
    })
  })
  test("renders question and answer form with user's security question", async () => {
    renderComponent({ type: "forgot password", user: { id: 1 } })

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Question/i })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /Answer/i })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument()
    })
  })
  test("save the user's security question and answer when the user submits the form", async () => {
    renderComponent({ type: "register", user: null })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(() => {
      expect(screen.getByText("2 / 3")).toBeInTheDocument()
    })
  })
  test("navigates to the dashboard when the user creates 3 security questions", async () => {
    renderComponent({ type: "register", user: null })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(() => {
      expect(screen.getByText(/home/i)).toBeInTheDocument()
    })
  })
  test("sends username email when user successfully submits form", async () => {
    renderComponent({ type: "forgot username", user: { id: 1 } })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(() => {
      expect(setIsAuthenticatedHandler).toHaveBeenCalled()
    })
  })
  test("send reset password email when user successfully submits form", async () => {
    renderComponent({
      type: "forgot password",
      user: { username: "user", email: "email@mail.com", id: 1 }
    })

    await waitFor(async () => {
      await updateInputs()
      submit()
    })

    await waitFor(() => {
      expect(setIsAuthenticatedHandler).toHaveBeenCalled()
    })
  })
  test("displays error message when user submits incorrect answer", async () => {
    renderComponent({
      type: "forgot password",
      user: { username: "user", email: "email@mail.com", id: 1 }
    })
    await waitFor(async () => {
      await updateInputs(true)
      submit()
    })

    await waitFor(() => {
      expect(
        screen.getByText("Answer is incorrect, please try again.")
      ).toBeInTheDocument()
    })
  })
})
