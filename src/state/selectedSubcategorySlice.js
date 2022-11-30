import { createSlice } from "@reduxjs/toolkit"

export const selectedSubcategorySlice = createSlice({
  name: "selectedSubcategory",
  initialState: {
    value: { ID: 0, Total: null, Name: null }
  },
  reducers: {
    selectSubcategory: (state, action) => {
      state.value = state.value.ID === action.payload.ID ? 0 : action.payload
    },
    updateSelectedTotal: (state, action) => {
      state.value.Total += action.payload
    }
  }
})

export const { selectSubcategory, updateSelectedTotal } = selectedSubcategorySlice.actions

export default selectedSubcategorySlice.reducer
