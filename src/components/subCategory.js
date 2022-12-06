import { Droppable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
//import { selectSubcategory } from "../state/selectedSubcategorySlice"
import { selectSubcategory } from "../state/subcategoriesSlice"

import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const Subcategory = ({ subcategory, droppable }) => {
  //const selectedSubcategoryID = useSelector((state) => state.selectedSubcategory.value.ID)

  const Item = styled(Paper)(({ theme }) => ({
    marginRight: "4px !important",
    marginLeft: "3px !important",
    cursor: "pointer",
    height: "45px",
    backgroundColor: subcategory.isSelected
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(255, 255, 255, 0.9)",
    flexShrink: 0
  }))

  const dispatch = useDispatch()

  const select = () => {
    dispatch(selectSubcategory(subcategory.ID))
  }
  return (
    <Droppable droppableId={subcategory.Name} isDropDisabled={droppable}>
      {(provided, snapshot) => (
        // <Container
        <Item
          elevation={subcategory.isSelected ? 8 : 2}
          // will need to find another way to inject this logic below
          // isSelected={isSelected}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={select}
        >
          <Typography>{subcategory.Name + ":" + subcategory.Total}</Typography>
        </Item>
        // {/* </Container> */}
      )}
    </Droppable>
  )
}

export default Subcategory
