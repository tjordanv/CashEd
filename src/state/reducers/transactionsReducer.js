const reducer = (state = [], action) => {
  let stateArr = state;

  switch (action.type) {
    case "importTransactions":
      return [...state].concat(action.payload);
    case "reorderTransactions":
      const transaction = state[action.payload.sourceIndex];
      // add logic to check if item is coming from another list. That will determine how to reorder things
      state.splice(action.payload.sourceIndex, 1);
      state.splice(action.payload.destinationIndex, 0, transaction);

      return state;
    case "addSubcategory":
      stateArr[action.payload.transactionIndex].subCategoryID =
        action.payload.subcategoryID;
      stateArr[action.payload.transactionIndex].categoryID = action.payload.categoryID;
      return [...stateArr];

    // this needs to return some sort of data for the app to store to prevent transaction
    // from being pulled into future imports
    case "deleteTransaction":
      stateArr.splice(action.payload.index, 1);
      return [...stateArr];
    default:
      return stateArr;
  }
};

export default reducer;
