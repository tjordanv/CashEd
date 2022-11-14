const reducer = (state = 0, action) => {
  switch (action.type) {
    case "selectSubCategory":
      if (state === action.payload) {
        return 0;
      } else {
        return action.payload;
      }
    default:
      return state;
  }
};

export default reducer;
