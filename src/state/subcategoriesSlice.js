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
    },
    selectSubcategory: (state, action) => {
      state = state.value.forEach((subcategory) => {
        // unselect other subcategory if already selected
        if (subcategory.ID !== action.payload) {
          subcategory.isSelected = false
        }
        // unselect the clicked subcategory if already selected, otherwise select it
        if (subcategory.ID === action.payload) {
          subcategory.isSelected = subcategory.isSelected ? false : true
        }
      })
    }
  }
})

export const {
  importSubcategories,
  filterSubcategories,
  updateSubcategoryTotal,
  selectSubcategory
} = subcategoriesSlice.actions

export default subcategoriesSlice.reducer
