export const importTransactions = (transactions) => {
  return (dispatch) => {
    dispatch({
      type: "importTransactions",
      payload: transactions
    });
  };
};

export const reorderTransactions = (sourceIndex, destinationIndex) => {
  return (dispatch) => {
    dispatch({
      type: "reorderTransactions",
      payload: { sourceIndex, destinationIndex }
    });
  };
};

export const addSubcategory = (transactionIndex, subcategoryID, categoryID) => {
  return (dispatch) => {
    dispatch({
      type: "addSubcategory",
      payload: { transactionIndex, subcategoryID, categoryID }
    });
  };
};

// this needs to return some sort of data for the app to store to prevent transaction
// from being pulled into future imports
export const deleteTransaction = (index) => {
  return (dispatch) => {
    dispatch({
      type: "deleteTransaction",
      payload: { index }
    });
  };
};
