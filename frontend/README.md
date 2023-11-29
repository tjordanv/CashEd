# CashEd

Know Your Money

# Directory
## app
## assets
*Images and logos that are used throughout the application.*
## components
## mocks
*Mimics the structure and behavior of the API without relying on the actual backend services. Enables the testing of components in isolation without making real network requests, ensuring that components respond correctly to various data scenarios.*
- **handlers.js**
  - defines the mock responses to mimic the behavior of the API. Allows you to simulate backend behavior for any given endpoint
- **server.js**
  - defines the mock server using MSW and the custom responses from handlers.js
## pages
## state
*React Redux Slice files that define the reducers and actions to manage specific parts of the application state*
- notificationsSlice.js
  - reducers and actions for notifications
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
