import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SecurityQandA from "./SecurityQandA"

const setIsAuthenticatedHandler = jest.fn()

const renderComponent = (props) => {
  render(
    <BrowserRouter>
      <SecurityQandA
        type={props.type}
        user={props.user}
        setIsAuthenticatedHandler={setIsAuthenticatedHandler}
      />
    </BrowserRouter>
  )
}
const updateInputs = () => {
  const securityQuestionInput = screen.getByLabelText(/Question/i)
  const securityAnswerInput = screen.getByLabelText(/Answer/i)

  fireEvent.change(securityQuestionInput, {
    target: { value: "test question" }
  })
  fireEvent.change(securityAnswerInput, {
    target: { value: "test answer" }
  })

  return { securityQuestionInput, securityAnswerInput }
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
  test("increases the security question count when a new question is saved during registration", async () => {
    renderComponent({ type: "register", user: { id: 1 } })
  })
  // test("triggers authentication when form is submitted", () => {
  //     renderComponent();

  //     // Simulate user input and submit the form
  //     fireEvent.change(screen.getByLabelText("Security Answer"), {
  //         target: { value: "test answer" },
  //     });
  //     fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

  //     // Assert that the authentication handler is called with the correct arguments
  //     expect(setIsAuthenticatedHandler).toHaveBeenCalledWith(true);
  // });
})
