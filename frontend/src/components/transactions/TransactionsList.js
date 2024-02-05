import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import { FixedSizeList as List } from "react-window"
import { Draggable } from "react-beautiful-dnd"

import classes from "./TransactionsList.module.css"

const TransactionsList = ({
  transactions,
  droppableId,
  deleteTransactionHandler
}) => {
  const heightInPixels = window.innerHeight * (70 / 100)

  const Row = (props) => {
    const { data: transactions, index, style } = props
    const transaction = transactions[index]
    return (
      <Draggable
        draggableId={transaction.transactionId || transaction.name}
        index={index}
        key={index}
      >
        {(provided) => (
          <Transaction
            provided={provided}
            transaction={transaction}
            style={style}
            className={classes.listItem}
            index={index}
            deleteTransactionHandler={deleteTransactionHandler}
          />
        )}
      </Draggable>
    )
  }

  return (
    <Droppable
      droppableId={droppableId}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => {
        const transaction = transactions[rubric.source.index]
        return (
          <Transaction
            transaction={transaction}
            index={rubric.source.index}
            deleteTransactionHandler={deleteTransactionHandler}
            provided={provided}
            snapshot={snapshot}
          />
        )
      }}
    >
      {(provided, snapshot) => (
        <List
          height={heightInPixels}
          width={215}
          outerRef={provided.innerRef}
          itemCount={transactions.length}
          itemSize={68}
          itemData={transactions}
          className={classes.list}
        >
          {Row}
        </List>
      )}
    </Droppable>
  )
}

export default TransactionsList
