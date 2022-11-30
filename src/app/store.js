import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../state/transactionsSlice"
import subcategoriesReducer from "../state/subcategoriesSlice"
import selectedSubcategoryReducer from "../state/selectedSubcategorySlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    subcategories: subcategoriesReducer,
    selectedSubcategory: selectedSubcategoryReducer
  }
})
