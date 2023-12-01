import { configureStore } from "@reduxjs/toolkit"
import notificationsReducer from "./state/notificationsSlice"

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer
  }
})
