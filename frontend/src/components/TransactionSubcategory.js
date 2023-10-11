import { Card, CardContent } from "@mui/material"
import { Droppable } from "react-beautiful-dnd"

const TransactionSubcategory = ({
  subcategory,
  isActive,
  setActiveSubcategoryId,
  transactions
}) => {
  return (
    <Droppable droppableId={subcategory.id.toString()}>
      {(provided, snapshot) => (
        <Card
          onClick={() => setActiveSubcategoryId(subcategory.id)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <CardContent>
            <p>{subcategory.name}</p>
            {isActive && <p>ACTIVE</p>}
            {provided.placeholder}
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}

export default TransactionSubcategory
