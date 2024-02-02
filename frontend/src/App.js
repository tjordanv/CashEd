import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserRecovery from "./pages/auth/UserRecovery"
import TransactionImport from "./pages/TransactionImport"
import { TransactionSubcategoriesImportLoader } from "./components/transactions/TransactionCategories"
import Header from "./pages/Header"
import Notifications from "./pages/Notifications"
import PasswordReset from "./pages/auth/PasswordReset"
import LandingWrapper from "./pages/LandingWrapper"
import DashboardTest from "./components/DashboardTest"
import AboutUs from "./pages/AboutUs"
import { passwordResetLoader } from "./components/auth/PasswordResetForm"
import { headerNotificationsLoader } from "./components/header/HeaderLayout"
import { notificationsLoader } from "./components/notifications/Notifications"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Accounts from "./pages/Accounts"
import { accountsLoader } from "./pages/Accounts"

import "./App.css"
import ComingSoon from "./pages/ComingSoon"

// color palettes that can be used on any JSX component without the need for CSSs
const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2",
      dark: "#0f877b",
      text: "#454545"
    },
    danger: {
      main: "#CC0000",
      dark: "#b53131"
    },
    secondary: {
      main: "#227C9D"
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingWrapper />,
    children: [
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "userRecovery/forgotUsername", element: <UserRecovery /> },
      {
        path: "userRecovery/forgotPassword",
        element: <UserRecovery isPasswordReset={true} />
      },
      {
        path: "resetPassword/:token",
        element: <PasswordReset />,
        loader: ({ params }) => {
          return passwordResetLoader(params.token)
        }
      },
      {
        path: "AboutUs",
        element: <AboutUs />
      },
      { path: "contact", element: <Contact /> }
    ]
  },
  {
    path: "/",
    element: <Header />,
    loader: headerNotificationsLoader,
    children: [
      {
        index: true,
        element: <DashboardTest />
      },
      {
        path: "TransactionImport",
        element: <TransactionImport />,
        loader: TransactionSubcategoriesImportLoader
      },
      {
        // path: "notifications",
        // element: <Notifications />,
        path: "comingSoon",
        element: <ComingSoon />,
        loader: notificationsLoader
      },
      {
        path: "accounts",
        element: <Accounts />,
        loader: accountsLoader
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
export { theme }
