import { createSlice } from "@reduxjs/toolkit"

export const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    value: []
  },
  reducers: {
    importSubCategories: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
    filterSubCategories: (state, action) => {
      state.value = state.value.filter((subCategory) => subCategory.ID === action.payload)
    },
    updateSubCategoryTotal: (state, action) => {
      state.value = state.value.forEach((subCategory) => {
        if (subCategory.ID === action.payload.categoryId) {
          subCategory.Total = subCategory.Total + action.payload.amount
        }
      })
    }
  }
})

export const { importSubCategories, filterSubCategories, updateSubCategoryTotal } =
  subcategoriesSlice.actions

export default subcategoriesSlice.reducer
