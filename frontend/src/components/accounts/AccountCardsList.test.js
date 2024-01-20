import { render, screen } from "@testing-library/react"
import AccountCardsList from "./AccountCardsList"

describe("AccountCardsList", () => {
  const accounts = [
    {
      id: 1,
      accountId: "ARKzxWz1VRiVjQNQyVmLh8zEm6aDaEi96qvA7",
      mask: "1234",
      name: "Account Name",
      officialName: "Official Name",
      logo: "sfsdfsdfdfsddfs",
      subtype: "Savings",
      nickname: "Account Nickname",
      isDeleted: false
    },
    {
      id: 2,
      accountId: "ARKzedr1VRiVjQNQyVmLh8zEm6aDaEi96qvA7",
      mask: "9934",
      name: "Account 2 Name",
      officialName: "Official Name 2",
      logo: "sfsdfsdfdfsddfs",
      subtype: "Savings 2",
      nickname: "Account Nickname 2",
      isDeleted: false
    },
    {
      id: 3,
      accountId: "AhnmxWz1VRiVjQNQyVmLh8zEm6aDaEi96qvA7",
      mask: "5555",
      name: "Account Name 3",
      officialName: "Official Name 3",
      logo: "sfsdfsdfdfsddfs",
      subtype: "Savings 3",
      nickname: "Account Nickname 3",
      isDeleted: false
    }
  ]

  const removeAccountHandler = jest.fn()
  const saveAccountHandler = jest.fn()

  const renderComponent = () => {
    render(
      <AccountCardsList
        accounts={accounts}
        removeAccountHandler={removeAccountHandler}
        saveAccountHandler={saveAccountHandler}
      />
    )
  }

  test("renders the list of accounts", () => {
    renderComponent()

    // Assert that the account cards are rendered
    const accountsList = screen.getByTestId("accounts-list")
    expect(accountsList.children).toHaveLength(accounts.length)
  })
})
