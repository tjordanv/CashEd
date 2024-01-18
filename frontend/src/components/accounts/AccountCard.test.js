import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import AccountCard from "./AccountCard"

describe("AccountCard", () => {
  const defaultAccount = {
    id: 1,
    accountId: "ARKzxWz1VRiVjQNQyVmLh8zEm6aDaEi96qvA7",
    mask: "1234",
    name: "Account Name",
    officialName: "Official Name",
    // logo: "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",
    logo: "sfsdfsdfdfsddfs",
    subtype: "Savings",
    nickname: "Account Nickname",
    isDeleted: false
  }

  const removeAccountHandler = jest.fn()
  const saveAccountHandler = jest.fn()

  const expandCard = async (isClosing) => {
    const expandButton = screen.getByLabelText(/show more/i)
    fireEvent.click(expandButton)

    if (isClosing) {
      fireEvent.click(expandButton)
    }

    let nicknameInput
    let saveButton
    let removeButton
    if (isClosing) {
      // Wait for the element to be removed from the document
      await waitFor(() => {
        nicknameInput = screen.queryByText(/nickname/i)
        saveButton = screen.queryByLabelText(/save/i)
        removeButton = screen.queryByLabelText(/remove/i)
      })
    } else {
      nicknameInput = screen.getByText(/nickname/i)
      saveButton = screen.getByLabelText(/save/i)
      removeButton = screen.getByLabelText(/remove/i)
    }

    return {
      nicknameInput: nicknameInput,
      saveButton: saveButton,
      removeButton: removeButton
    }
  }

  const renderComponent = (account) => {
    render(
      <AccountCard
        account={account}
        removeAccountHandler={removeAccountHandler}
        saveAccountHandler={saveAccountHandler}
      />
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

    const expandedFields = await waitFor(() => {
      expandCard()
    })

    await waitFor(() => {
      expect(expandedFields.nicknameInput).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(expandedFields.saveButton).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(expandedFields.removeButton).toBeInTheDocument()
    })
  })

  test("expands and closes the card", () => {
    renderComponent(defaultAccount)

    const expandedFields = expandCard(true)

    expect(expandedFields.nicknameInput).toBeNull()
  })

  // test("recieves nickname input", () => {
  //   renderComponent(defaultAccount)
  //   expandCard()

  // })

  // test("calls removeAccountHandler when delete button is clicked", () => {
  //   const deleteButton = screen.getByTestId("delete-button")
  //   fireEvent.click(deleteButton)
  //   expect(removeAccountHandler).toHaveBeenCalledTimes(1)
  //   expect(removeAccountHandler).toHaveBeenCalledWith(defaultAccount.id)
  // })

  // test("calls saveAccountHandler when save button is clicked", () => {
  //   const saveButton = screen.getByTestId("save-button")
  //   fireEvent.click(saveButton)
  //   expect(saveAccountHandler).toHaveBeenCalledTimes(1)
  //   expect(saveAccountHandler).toHaveBeenCalledWith(defaultAccount)
  // })
})
