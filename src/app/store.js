import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../state/transactionsSlice"
import subcategoriesReducer from "../state/subcategoriesSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    subcategories: subcategoriesReducer
  }
})
