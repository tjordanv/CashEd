import { useState } from "react";
import { Droppable, style } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { styled } from "@mui/material/styles";
import { selectedSubCategoryIDActionCreators } from "../state";

import Paper from "@mui/material/Paper";

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 18px;
//   width: 90%;
//   background-color: ${(props) =>
//     props.isSelected === false ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)"};
//   /* make logic to set the cursor to default when dragging a transaction */
//   cursor: pointer;
// `;

// const Name = styled.p`
//   margin-left: 12px;
//   font-family: "Inter";
//   font-style: normal;
//   font-weight: 300;
//   font-size: 16px;
// `;

// const Total = styled.p`
//   margin-right: 12px;
//   font-family: "Inter";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 16px;
// `;

const SubCategory = ({ subCategory, droppable }) => {
  const selectedSubcategoryID = useSelector((state) => state.selectedSubCategoryID);

  const Item = styled(Paper)(({ theme }) => ({
    height: "35px",
    backgroundColor:
      selectedSubcategoryID === subCategory.ID
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(255, 255, 255, 0.9)"
  }));

  const dispatch = useDispatch();
  const { selectSubCategory } = bindActionCreators(
    selectedSubCategoryIDActionCreators,
    dispatch
  );

  const transactions = useSelector((state) =>
    state.transactions.filter(
      (transaction) => transaction.subCategoryID === subCategory.ID
    )
  );

  const log = () => {
    selectSubCategory(subCategory.ID);
  };
  return (
    <Droppable droppableId={subCategory.name} isDropDisabled={droppable}>
      {(provided, snapshot) => (
        // <Container
        <Item
          elevation={selectedSubcategoryID === subCategory.ID ? 8 : 2}
          // will need to find another way to inject this logic below
          // isSelected={isSelected}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={log}
        >
          <p>{subCategory.name + ":" + subCategory.Total}</p>
        </Item>
        // {/* </Container> */}
      )}
    </Droppable>
  );
};

export default SubCategory;
