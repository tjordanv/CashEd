# CashEd

Know Your Money

# Directory
## assets
*Images and logos that are used throughout the application.*
## components
*The component files that make up the rendered pages.*
- **ContactForm.js**
  - The form that allows users and non-users to contact us directly. 
- **DashboardTest.js**
  - A placeholder file for the dashboard users see when they log in.
- **HomePieChart.js**
  - A pie chart used on the homepage that provides an interactive model to display basic information about the application to users.
### aboutUs
- **AboutUsBio.js**
  - The bio component used in the About Us page to describe CasedEd as an application
- **AboutUsSelector.js**
  - The selector component that allows users to switch between the application bio and the creator bio on the About Us page
- **AboutUsWrapper.js**
  - The Card wrapper used to build the application and creator bio cards
- **BioCard.js**
  - The bio card used to display info about a creator
- **EmailIcon.js**
  - an email icon that allows users to copy the email address of the corresponding creator to their clipboard. Used in the BioCard component.
### accounts
- **AccountCard.js**
  - The card component that renders a given bank account object
- **AccountCardList.js**
  - The container that renders the user's active bank accounts
### authentication 
- **FormFooter.js**
  - The footer for the auth forms. Includes links to other pages, back button, and info tooltips
- **FormHeader.js**
  - The standardized header for all authentication forms
- **LoginForm.js**
  - The user login form
- **PasswordResetForm.js**
- **RegisterForm.js**
  - The form for users to reset their login password
  - **PasswordResetLoader**
    - confirms that the token in the URL is valid to control access to the reset page 
- **RequestResponse.js**
- **SecurityQandA.js**
- **SecurityQuestionsCounter.js**
  -  Displays the number of active security questions the user has 
### header
- **DrawerLayout.js**
- **HeaderLayout.js**
- **LandingHeader.js**
### notifications
- **NotificationCard.js**
- **Notifications.js**
### transactions
- **AddTransactionForm.js**
- **AddTransactionMenuButtons.js**
- **AddTransactions.js**
- **Transaction.js**
- **TransactionCategories.js**
- **TransactionCategory.js**
- **TransactionsList.js**
- **TransactionSubcategory.js**
- **TransactionToolTip.js**
## mocks
*Mimics the structure and behavior of the API without relying on the actual backend services. Enables the testing of components in isolation without making real network requests, ensuring that components respond correctly to various data scenarios.*
- **handlers.js**
  - defines the mock responses to mimic the behavior of the API. Allows you to simulate backend behavior for any given endpoint
- **server.js**
  - defines the mock server using MSW and the custom responses from handlers.js
## pages
*The files that get used in the App.js file to render each page*
- **AboutUs.js**
- **Accounts.js**
- **Contact.js**
- **Header.js**
- **Home.js**
- **LandingWrapper.js**
  - The landing pages (home, login, register, forgot username, and forgot password) get wrapped in this to provide the landing header and footer
- **Notifications.js**
- **TransactionImport.js**
### auth
- **AuthHeader.js**
- **Login.js**
- **PasswordReset.js**
- **Register.js**
- **UserRecovery.js**
## state
*React Redux Slice files that define the reducers and actions to manage specific parts of the application state*
- notificationsSlice.js
  - reducers and actions for notifications
## uiComponents
*Components used to standardize the UI*
- **ConfirmationDialog.js**
- **EmailInput.js**
- **ErrorMessage.js**
- **FormButton.js**
- **MessageInput.js**
- **NameInput.js**
- **PasswordInput.js**
- **SaveTransactionsButton.js**
- **SecurityAnswer.js**
- **UsernameInput.js**
## utils
*Utility functions and modules*
- **fetchAuthorize.js**
  - an extension of the fetch API that passes the active user's access token to the HTTP request to grant access to protected endpoints
- **fetchError.js**
  - an extension of the JS Error class that deals specifically with server errors 
- **inputError.js**
  - an extension of the JS Error class that provides functionality for errors with input fields
- **usdFormatter.js**
  - takes an integer as input and formats it to USD
## other 
*Files that live directly inside of src*
- **App.js**
  - serves as the root component of the application. The component structure, routing setup, context and providers, and themes are defined here
- **index.js**
  - the entry point for the application. This renders the app and sets up global configurations
- **reportWebVitals.js**
  - a helper function used to report web performance metrics 
- **setupTests.js**
  -  handles the global setup and teardown logic that needs to run before and after all tests
- **store.js**
  - initializes and configures the redux store
