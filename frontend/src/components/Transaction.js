import { Draggable } from "react-beautiful-dnd"

const Transaction = ({ transaction, index }) => {
  return (
    <Draggable
      draggableId={transaction.description + transaction.date}
      index={index}
    >
      {(provided, snapshot) => (
        <p
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {transaction.description}
        </p>
      )}
    </Draggable>
  )
}

export default Transaction
