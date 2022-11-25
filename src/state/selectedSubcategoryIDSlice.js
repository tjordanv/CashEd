import { createSlice } from "@reduxjs/toolkit"

export const selectedSubcategorySlice = createSlice({
  name: "selectedSubcategory",
  initialState: {
    value: { ID: 0, Total: null, Name: null }
  },
  reducers: {
    selectSubcategory: (state, action) => {
      state.value = state.value === action.payload ? 0 : action.payload
    }
  }
})

export const { selectSubcategory } = selectedSubcategorySlice.actions

export default selectedSubcategorySlice.reducer
