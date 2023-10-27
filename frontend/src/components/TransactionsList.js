import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const TransactionsList = ({
  transactions,
  droppableId,
  deleteTransactionHandler
}) => {
  const print = () => {
    console.log(transactions)
  }
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <Box style={{ height: "75vh", overflow: "auto" }}>
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {transactions.map((transaction, index) =>
              transaction.subcategoryId == droppableId ||
              (droppableId === "list" && transaction.subcategoryId === null) ? (
                <ListItem key={Math.floor(Math.random() * 99999)}>
                  <Transaction
                    transaction={transaction}
                    deleteTransactionHandler={deleteTransactionHandler}
                    index={index}
                    key={Math.floor(Math.random() * 99999)}
                  />
                </ListItem>
              ) : null
            )}
            {provided.placeholder}
          </List>
        </Box>
      )}
    </Droppable>
  )
}

export default TransactionsList
