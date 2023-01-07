import { createSlice } from "@reduxjs/toolkit"

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    value: []
  },
  reducers: {
    importTransactions: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
    createSingleTransaction: (state, action) => {
      state.value.unshift(action.payload)
    },
    reorderTransactions: (state, action) => {
      const transaction = state.value[action.payload.sourceIndex]
      // add logic to check if item is coming from another list. That will determine how to reorder things
      state.value.splice(action.payload.sourceIndex, 1)
      state.value.splice(action.payload.destinationIndex, 0, transaction)
    },
    addSubcategory: (state, action) => {
      state.value[action.payload.transactionIndex].subcategoryID =
        action.payload.subcategoryID
      state.value[action.payload.transactionIndex].categoryID = action.payload.categoryID
    },
    // this needs to return some sort of data for the app to store to prevent transaction
    // from being pulled into future imports
    deleteTransaction: (state, action) => {
      state.value.splice(action.payload, 1)
    }
  }
})

export const {
  importTransactions,
  createSingleTransaction,
  reorderTransactions,
  addSubcategory,
  deleteTransaction
} = transactionsSlice.actions

export default transactionsSlice.reducer
