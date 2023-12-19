## Frontend

Refer to the [JSDoc Index File](./docs/index.html) for detailed documentation on the frontend code. The JSDoc Index File provides a comprehensive overview of the codebase, including detailed explanations of each function, class, and module. To use the JSDoc Index File, simply open it in a web browser and navigate through the documentation to find the information you need.

### Usage of createMemoryRouter in unit tests

In [passwordResetForm](./src/components/auth/PasswordResetForm.test.js), the `createMemoryRouter` function is used to create a memory router for testing purposes. This allows the test to simulate navigation within the application without actually changing the URL. This is necessary because that component relies on the useLoaderData hook, which must be wrapped in a data/memory router.

When testing a component that uses the useLoaderData hook, the following code can be used as a guide to setting up the router to render the component.

```const renderComponent = () => {
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

```test("submits the form correctly", async () => {
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
