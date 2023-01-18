import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../state/transactionsSlice"
import subcategoriesReducer from "../state/subcategoriesSlice"
import addTransactionDialogReducer from "../state/addTransactionDialogSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    subcategories: subcategoriesReducer,
    addTransactionDialog: addTransactionDialogReducer
  }
})
