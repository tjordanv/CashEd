import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserRecovery from "./pages/auth/UserRecovery"
import TransactionImport from "./pages/TransactionImport"
import Header from "./pages/Header"
import Notifications from "./pages/Notifications"
import AuthHeader from "./pages/auth/AuthHeader"
import PasswordReset, { loader } from "./pages/auth/PasswordReset"
import DashboardTest from "./components/DashboardTest"
import { QandALoader } from "./components/Authentication/SecurityQandA"
import { headerNotificationsLoader } from "./components/Header/HeaderLayout"
import { notificationsLoader } from "./components/Notifications/Notifications"

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
    loader: headerNotificationsLoader,
    children: [
      {
        index: true,
        element: <DashboardTest />
      },
      { path: "TransactionImport", element: <TransactionImport /> },
      {
        path: "notifications",
        element: <Notifications />,
        loader: notificationsLoader
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthHeader />,
    children: [
      { index: true, path: "login", element: <Login /> },
      { path: "register", element: <Register />, loader: QandALoader },
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
