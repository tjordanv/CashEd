export const importSubCategories = (subCategories) => {
  return (dispatch) => {
    dispatch({
      type: "importSubCategories",
      payload: subCategories
    });
  };
};

export const filterSubCategories = (categoryId) => {
  return (dispatch) => {
    dispatch({
      type: "filterSubCategories",
      payload: categoryId
    });
  };
};

export const updateSubCategoryTotal = (categoryId, amount) => {
  return (dispatch) => {
    dispatch({
      type: "updateSubCategoryTotal",
      payload: { categoryId: categoryId, amount: amount }
    });
  };
};
