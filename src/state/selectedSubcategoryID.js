import { createSlice } from "@reduxjs/toolkit"

export const selectedSubcategoryIDSlice = createSlice({
  name: "selectedSubcategoryID",
  initialState: {
    value: 0
  },
  reducers: {
    selectSubcategory: (state, action) => {
      state.value = state.value === action.payload ? 0 : action.payload
    }
  }
})

export const { selectSubcategory } = selectedSubcategoryIDSlice.actions

export default selectedSubcategoryIDSlice.reducer
