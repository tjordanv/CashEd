import { useCallback, useEffect, useState } from "react";
import SubCategory from "./subCategory";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import data from "../app/data";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { subCategoryActionCreators } from "../state/index";

const TransactionCategory = ({ category }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      category.ID === 1
        ? "rgba(23, 195, 178, 0.45)"
        : category.ID === 2
        ? "rgba(34, 124, 157, 0.65)"
        : category.ID === 3
        ? "rgba(255, 203, 119, 0.55)"
        : "rgba(254, 109, 115, 0.6)",
    height: category.ID <= 2 ? "235px" : "500px",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    position: "relative",
    minWidth: "130px"
  }));

  const dispatch = useDispatch();
  const { importSubCategories } = bindActionCreators(subCategoryActionCreators, dispatch);

  const [subs, setSubs] = useState([]);

  // the fake api call to get the subcategories
  const subCategoryAPICall = new Promise(function (myResolve, myReject) {
    let subCategories = data.subCategories.filter(
      (subCategory) => subCategory.categoryID === category.ID
    );

    if (subCategories) {
      myResolve(subCategories);
    } else {
      console.log("Subcategory 'API' call failed");
      myReject([]);
    }
  });

  // Fills the subcategories pulled from the DB into the global state
  useEffect(() => {
    subCategoryAPICall.then((res) => {
      setSubs(res);
      importSubCategories(res);
    });
  }, []);

  const num = 0;
  const total = useSelector((state) =>
    state.subCategories
      .filter((subCategory) => subCategory.categoryID === category.ID)
      .reduce((sum, subCategory) => sum + subCategory.Total, num)
      .toFixed(2)
  );

  const su = useSelector((state) => state.subCategories);

  const logs = () => {
    console.log(su);
  };

  return (
    <Item elevation={4}>
      <div className={"headers"}>
        <span className={"TransactionCategoryText"}>{category.name}</span>
        <br />
        <span className={"TransactionCategoryText"}>{total}</span>
      </div>
      <Stack spacing={1} className={"subs"}>
        {subs.map(
          (subCategory) =>
            subCategory.categoryID === category.ID && (
              <SubCategory
                subCategory={subCategory}
                droppable={false}
                key={subCategory.ID}
              />
            )
        )}
      </Stack>
      <IconButton className={"footer"} aria-label="Import" onClick={logs}>
        <AddBoxIcon color="lightWhite" fontSize="medium" />
      </IconButton>
    </Item>
  );
};

export default TransactionCategory;
