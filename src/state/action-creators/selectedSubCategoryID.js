export const selectSubCategory = (subCategoryID) => {
  return (dispatch) => {
    dispatch({
      type: "selectSubCategory",
      payload: subCategoryID
    });
  };
};
