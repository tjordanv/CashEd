import { Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { styled } from "@mui/material/styles"
import { selectSubcategory } from "../state/subcategoriesSlice"

import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const Item = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected"
})(({ theme, isSelected }) => ({
  marginRight: "4px !important",
  marginLeft: "3px !important",
  cursor: "pointer",
  height: "65px",
  backgroundColor: isSelected
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(255, 255, 255, 0.9)",
  flexShrink: 0
}))
const Subcategory = ({ subcategory, droppable }) => {
  const dispatch = useDispatch()

  const select = () => {
    dispatch(selectSubcategory(subcategory.ID))
  }
  return (
    <Droppable droppableId={subcategory.Name} isDropDisabled={droppable}>
      {(provided, snapshot) => (
        <Item
          elevation={subcategory.isSelected ? 8 : 2}
          // will need to find another way to inject this logic below
          // isSelected={isSelected}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={select}
          isSelected={subcategory.isSelected}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "65px",
              width: "96%",
              alignItems: "center",
              paddingLeft: "2%",
              paddingRight: "2%"
            }}
          >
            <Box
              sx={{
                width: "75%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start"
              }}
            >
              <Typography sx={{ textAlign: "start" }}>
                {subcategory.Name + ":"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end"
              }}
            >
              <Typography sx={{ textAlign: "end" }}>
                ${subcategory.Total}
              </Typography>
            </Box>
          </Box>
        </Item>
      )}
    </Droppable>
  )
}

export default Subcategory
