import { createSlice } from "@reduxjs/toolkit"

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    value: null
  },
  reducers: {
    fetchNotificationCounts: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { fetchNotificationCounts } = notificationsSlice.actions

export default notificationsSlice.reducer
