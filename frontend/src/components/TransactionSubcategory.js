import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Droppable } from "react-beautiful-dnd"
import classes from "./TransactionSubcategory.module.css"

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
          className={classes.container}
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
