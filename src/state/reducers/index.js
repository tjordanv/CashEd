import { combineReducers } from "redux";
import subCategoryReducer from "./subCategoryReducer";
import transactions from "./transactionsReducer";
import selectedSubCategoryID from "./selectedSubCategoryIDReducer";

const reducers = combineReducers({
  subCategories: subCategoryReducer,
  transactions: transactions,
  selectedSubCategoryID: selectedSubCategoryID
});

export default reducers;
