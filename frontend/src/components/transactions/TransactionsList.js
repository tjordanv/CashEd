import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import { FixedSizeList as VirtualizedList } from "react-window"
import { Draggable } from "react-beautiful-dnd"
import List from "@mui/material/List"

import classes from "./TransactionsList.module.css"
import { ListItem } from "@mui/material"

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
            index={index}
            deleteTransactionHandler={deleteTransactionHandler}
          />
        )}
      </Draggable>
    )
  }

  if (droppableId) {
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
          <VirtualizedList
            height={heightInPixels}
            width={215}
            outerRef={provided.innerRef}
            itemCount={transactions.length}
            itemSize={68}
            itemData={transactions}
            className={classes.list}
          >
            {Row}
          </VirtualizedList>
        )}
      </Droppable>
    )
  } else {
    return (
      <List className={classes.nonDraggableList}>
        {transactions.map((transaction, index) => (
          <ListItem key={index} className={classes.listItem}>
            <Transaction
              transaction={transaction}
              deleteTransactionHandler={deleteTransactionHandler}
              index={index}
            />
          </ListItem>
        ))}
      </List>
    )
  }
}

export default TransactionsList
