import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import AccountCard from "./AccountCard"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../App"

describe("AccountCard", () => {
  const defaultAccount = {
    id: 1,
    accountId: "ARKzxWz1VRiVjQNQyVmLh8zEm6aDaEi96qvA7",
    mask: "1234",
    name: "Account Name",
    officialName: "Official Name",
    logo: "sfsdfsdfdfsddfs",
    subtype: "Savings",
    nickname: "Account Nickname",
    isDeleted: false
  }

  const removeAccountHandler = jest.fn()
  const saveAccountHandler = jest.fn()

  const expandCard = () => {
    const expandButton = screen.getByLabelText(/show more/i)
    fireEvent.click(expandButton)
  }

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

  test("renders account details correctly", () => {
    renderComponent(defaultAccount)
    expect(screen.getByText(/Account Name/i)).toBeInTheDocument()
    expect(screen.getByText(/official Name/i)).toBeInTheDocument()
    expect(screen.getByText(/1234/)).toBeInTheDocument()
    expect(screen.getByRole("img", { alt: /$/ })).toBeInTheDocument()
  })

  test("expands the card when the expand button is clicked", async () => {
    renderComponent(defaultAccount)
    expandCard()

    expect(screen.getByText(/nickname/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/save/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/remove/i)).toBeInTheDocument()
  })

  test("expands and closes the card", async () => {
    renderComponent(defaultAccount)

    expandCard()
    expandCard()

    await waitFor(() => {
      expect(screen.queryByText(/nickname/i)).toBeNull()
    })
    expect(screen.queryByLabelText(/save/i)).toBeNull()
    expect(screen.queryByLabelText(/remove/i)).toBeNull()
  })

  test("recieves nickname input", () => {
    renderComponent(defaultAccount)
    expandCard()

    const nicknameInput = screen.getByLabelText(/nickname/i)
    fireEvent.change(nicknameInput, { target: { value: "New Nickname" } })

    expect(nicknameInput.value).toBe("New Nickname")
    expect(screen.getByDisplayValue(/New Nickname/i)).toBeInTheDocument()
  })
  test("Displays the unsaved changes message when the nickname is changed", () => {
    renderComponent(defaultAccount)
    expandCard()

    const nicknameInput = screen.getByLabelText(/nickname/i)
    fireEvent.change(nicknameInput, { target: { value: "New Nickname" } })

    expect(screen.getByLabelText(/unsaved changes/i)).toBeInTheDocument()
  })
  test("calls saveAccountHandler when save button is clicked", () => {
    renderComponent(defaultAccount)
    expandCard()

    const nicknameInput = screen.getByLabelText(/nickname/i)
    fireEvent.change(nicknameInput, { target: { value: "New Nickname" } })

    const saveButton = screen.getByRole("button", { name: /save/i })
    fireEvent.click(saveButton)

    expect(saveAccountHandler).toHaveBeenCalledTimes(1)
    expect(saveAccountHandler).toHaveBeenCalledWith(1, "New Nickname")
  })
  test("Display the saved message when the save button is clicked", () => {
    renderComponent(defaultAccount)
    expandCard()

    const nicknameInput = screen.getByLabelText(/nickname/i)
    fireEvent.change(nicknameInput, { target: { value: "New Nickname" } })

    const saveButton = screen.getByRole("button", { name: /save/i })
    fireEvent.click(saveButton)

    expect(screen.getByText(/saved/i)).toBeInTheDocument()
  })
  test("opens the delete confirmation modal when the delete button is clicked", () => {
    renderComponent(defaultAccount)
    expandCard()

    const deleteButton = screen.getByRole("button", { name: /remove/i })
    fireEvent.click(deleteButton)

    expect(screen.getByText(/remove account/i)).toBeInTheDocument()
  })
  test("calls removeAccountHandler when delete button is clicked", () => {
    renderComponent(defaultAccount)
    expandCard()

    const deleteButton = screen.getByRole("button", { name: /remove/i })
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole("button", {
      name: /remove/i
    })
    fireEvent.click(confirmButton)

    expect(removeAccountHandler).toHaveBeenCalledTimes(1)
    expect(removeAccountHandler).toHaveBeenCalledWith(defaultAccount.id)
  })
  test("closes the delete confirmation modal when cancel button is clicked", async () => {
    renderComponent(defaultAccount)
    expandCard()

    const deleteButton = screen.getByRole("button", { name: /remove/i })
    fireEvent.click(deleteButton)

    const cancelButton = screen.getByRole("button", { name: /cancel/i })
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(screen.queryByText(/remove account/i)).toBeNull()
    })
  })
})
