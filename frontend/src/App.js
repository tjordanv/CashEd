import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserRecovery from "./pages/auth/UserRecovery"
import TransactionImport from "./pages/TransactionImport"
import Header from "./pages/Header"
import AuthHeader from "./pages/auth/AuthHeader"
import PasswordReset, { loader } from "./pages/auth/PasswordReset"
import DashboardTest from "./components/DashboardTest"

const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2"
    },
    lightWhite: {
      main: "rgba(255, 255, 255, 0.9)"
    },
    greyText: {
      main: "#454545"
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <DashboardTest />
        // loader: loader
      },
      { path: "TransactionImport", element: <TransactionImport /> }
    ]
  },
  {
    path: "/auth",
    element: <AuthHeader />,
    children: [
      { index: true, path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "userRecovery/forgotUsername", element: <UserRecovery /> },
      {
        path: "userRecovery/resetPassword",
        element: <UserRecovery isPasswordReset={true} />
      },
      {
        path: "resetPassword/:token",
        element: <PasswordReset />,
        loader: ({ params }) => {
          return loader(params.token)
        }
      }
    ]
  },
  { path: "/logout", element: <p>logout</p> }
])

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
