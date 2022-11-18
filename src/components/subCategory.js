import { Droppable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { selectSubcategory } from "../state/selectedSubcategoryIDSlice"

import Paper from "@mui/material/Paper"

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

const Subcategory = ({ subcategory, droppable }) => {
  const selectedSubcategoryID = useSelector((state) => state.selectedSubcategoryID.value)

  const Item = styled(Paper)(({ theme }) => ({
    height: "35px",
    backgroundColor:
      selectedSubcategoryID === subcategory.ID
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(255, 255, 255, 0.9)"
  }))

  const dispatch = useDispatch()

  const transactions = useSelector((state) =>
    state.transactions.value.filter(
      (transaction) => transaction.subcategoryID === subcategory.ID
    )
  )

  const select = () => {
    dispatch(selectSubcategory(subcategory.ID))
  }
  return (
    <Droppable droppableId={subcategory.name} isDropDisabled={droppable}>
      {(provided, snapshot) => (
        // <Container
        <Item
          elevation={selectedSubcategoryID === subcategory.ID ? 8 : 2}
          // will need to find another way to inject this logic below
          // isSelected={isSelected}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={select}
        >
          <p>{subcategory.name + ":" + subcategory.Total}</p>
        </Item>
        // {/* </Container> */}
      )}
    </Droppable>
  )
}

export default Subcategory
