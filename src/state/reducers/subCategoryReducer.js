// import data from '../../data'
const reducer = (state = [], action) => {
  let stateArr = state;

  switch (action.type) {
    case "importSubCategories":
      return [...state].concat(action.payload);
    case "filterSubCategories":
      return stateArr.filter((subCategory) => subCategory.id === action.payload);
    case "updateSubCategoryTotal":
      stateArr.forEach((subCategory) => {
        if (subCategory.ID === action.payload.categoryId) {
          subCategory.Total = subCategory.Total + action.payload.amount;
        }
      });
      return stateArr;
    // case "addSubCategory"
    //return [...state, action.payload];
    // case "removeSubCategory"
    default:
      return stateArr;
  }
};

export default reducer;
