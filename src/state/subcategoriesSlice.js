import { createSlice } from "@reduxjs/toolkit"

export const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    value: []
  },
  reducers: {
    importSubcategories: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
    filterSubcategories: (state, action) => {
      state.value = state.value.filter((subcategory) => subcategory.ID === action.payload)
    },
    updateSubcategoryTotal: (state, action) => {
      state = state.value.forEach((subcategory) => {
        if (subcategory.ID === action.payload.subcategoryID) {
          subcategory.Total = subcategory.Total + action.payload.amount
        }
      })
    }
  }
})

export const { importSubcategories, filterSubcategories, updateSubcategoryTotal } =
  subcategoriesSlice.actions

export default subcategoriesSlice.reducer
