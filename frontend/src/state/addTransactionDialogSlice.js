import { createSlice } from "@reduxjs/toolkit"

export const addTransactionDialogSlice = createSlice({
  name: "addTransactionDialog",
  initialState: {
    value: { isOpen: false, isSingleTransaction: false }
  },
  reducers: {
    isDialogOpen: (state, action) => {
      state.value.isOpen = state.value.isOpen ? false : true
      state.value.isSingleTransaction = action.payload
    }
  }
})

export const { isDialogOpen } = addTransactionDialogSlice.actions

export default addTransactionDialogSlice.reducer
