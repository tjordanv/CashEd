import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserRecovery from "./pages/auth/UserRecovery"
import TransactionImport from "./pages/TransactionImport"
import { TransactionSubcategoriesImportLoader } from "./components/TransactionCategory"
import Header from "./pages/Header"
import Notifications from "./pages/Notifications"
import PasswordReset from "./pages/auth/PasswordReset"
import LandingWrapper from "./pages/LandingWrapper"
import DashboardTest from "./components/DashboardTest"
import AboutUs from "./pages/AboutUs"
import { passwordResetLoader } from "./components/Authentication/PasswordResetForm"
import { QandALoader } from "./components/Authentication/SecurityQandA"
import { headerNotificationsLoader } from "./components/Header/HeaderLayout"
import { notificationsLoader } from "./components/Notifications/Notifications"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import TransactionImportOLD from "./pages/TransactionImport(old)"
import Accounts from "./pages/Accounts"
import { accountsLoader } from "./pages/Accounts"

import "./App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#17C3B2",
      dark: "#0f877b",
      text: "#454545"
    },
    danger: {
      main: "#fa4343",
      dark: "#b53131"
    },
    secondary: {
      main: "#227C9D"
    }
  }
  // components: {
  //   CardHeader: {
  //     styleOverrides: {
  //       title: {
  //         fontSize: "large"
  //       }
  //     }
  //   }
  // }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingWrapper />,
    children: [
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register />, loader: QandALoader },
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
        path: "TransactionImport/old",
        element: <TransactionImportOLD />
      },
      {
        path: "notifications",
        element: <Notifications />,
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
