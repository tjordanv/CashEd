import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Droppable } from "react-beautiful-dnd"
import classes from "./TransactionSubcategory.module.css"
import { Typography } from "@mui/material"
import { usdFormatter } from "../../utils/usdFormatter"

const TransactionSubcategory = ({
  subcategory,
  isActive,
  setActiveSubcategory,
  total
}) => {
  const color = isActive
    ? "rgba(255, 255, 255, 0.45)"
    : "rgba(255, 255, 255, 0.9)"

  return (
    <Droppable
      droppableId={
        subcategory.id.toString() + "," + subcategory.categoryId.toString()
      }
    >
      {(provided, snapshot) => (
        <Card
          onClick={() => setActiveSubcategory(subcategory)}
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classes.container}
          style={{ "--color": color }}
        >
          <CardContent className={classes.cardContent}>
            <Typography variant="body1">{subcategory.name}</Typography>
            <Typography variant="body1">{usdFormatter(total)}</Typography>
            {provided.placeholder}
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}

export default TransactionSubcategory
