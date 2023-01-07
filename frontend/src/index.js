import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { StyledEngineProvider } from "@mui/styled-engine-sc"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  // I am not exactly sure what React.StrictMode is but I removed it from wrapping my app
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
