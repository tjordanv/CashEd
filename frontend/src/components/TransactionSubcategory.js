import { Card, CardContent } from "@mui/material"
import { Droppable } from "react-beautiful-dnd"

const TransactionSubcategory = ({
  subcategory,
  isActive,
  setActiveSubcategoryId,
  total
}) => {
  return (
    <Droppable
      droppableId={
        subcategory.id.toString() + "," + subcategory.categoryId.toString()
      }
    >
      {(provided, snapshot) => (
        <Card
          onClick={() => setActiveSubcategoryId(subcategory.id)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <CardContent>
            <p>{subcategory.name}</p>
            {isActive && <p>{total}</p>}
            {provided.placeholder}
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}

export default TransactionSubcategory
