import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import { useSelector } from "react-redux"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const TransactionsList = ({ transactions, droppableId, subcategoryId }) => {
  TransactionsList.defaultProps = {
    subcategoryId: null
  }

  const print = () => {
    console.log(transactions)
  }
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
          {transactions.map((transaction, index) =>
            transaction.subcategoryId == droppableId ||
            (droppableId === "list" && transaction.subcategoryId === null) ? (
              <ListItem key={Math.floor(Math.random() * 99999)}>
                <Transaction
                  transaction={transaction}
                  index={index}
                  key={Math.floor(Math.random() * 99999)}
                />
              </ListItem>
            ) : null
          )}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}

export default TransactionsList
