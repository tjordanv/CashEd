# Frontend

Refer to the [JSDoc Index File](./docs/index.html) for detailed documentation on the frontend code. The JSDoc Index File provides a comprehensive overview of the codebase, including detailed explanations of each function, class, and module. To use the JSDoc Index File, simply open it in a web browser and navigate through the documentation to find the information you need.

# Unit Testing

## Usage of BrowserRouter

In [RegisterFormPt1.test](./src/components/auth/RegisterFormPt1.test.js), the `BrowserRouter` component from the `react-router-dom` library is used to provide routing functionalityThe `BrowserRouter` component wraps the component being tested and enables navigation between different routes within the application.

The `BrowserRouter` should be used when testing components that rely on routing functionality, such as navigating to different pages or handling route parameters, or simply include a `NavLink` element. It allows you to simulate the behavior of the application's routing system during testing.

To use `BrowserRouter` in a test, you can wrap the component being tested with it, as shown in the example below:

```
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
```

```
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
```

## Usage of createMemoryRouter in unit tests

In [PasswordResetForm.test](./src/components/auth/PasswordResetForm.test.js), the `createMemoryRouter` function is used to create a memory router for testing purposes. This allows the test to simulate navigation within the application without actually changing the URL. This is necessary because that component relies on the useLoaderData hook, which must be wrapped in a data/memory router.

When testing a component that uses the useLoaderData hook, the following code can be used as a guide to setting up the router to render the component.

```
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
```

When taking an action that will cause a change in the rendered elements, it must be wrapped in `act()`. Since the loader is asynchronous, any calls to rendered elements must use `await waitFor`.

```
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
```

## Usage of theme in unit tests

In [AccountCard.Test](./src/components/accounts/AccountCard.test.js), `theme` is imported from [App](./src/App.js) and passed as a prop to the `ThemeProvider` that wraps the [AccountCard](./src/components/accounts/AccountCard.js) component. This is necessary because the [AccountCard](./src/components/accounts/AccountCard.js) utilizes the [ConfirmationDialog](./src/uiComponents/ConfirmationDialog.js) and that modal requires a theme.

```
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../App"

  const renderComponent = (account) => {
    render(
      <ThemeProvider theme={theme}>
        <AccountCard
          account={account}
          removeAccountHandler={removeAccountHandler}
          saveAccountHandler={saveAccountHandler}
        />
      </ThemeProvider>
    )
  }
```

If you encounter an error when testing, such as, `TypeError: Cannot read properties of undefined (reading 'dark')`; you may need to provide a theme to the component(s) that are being tested.
