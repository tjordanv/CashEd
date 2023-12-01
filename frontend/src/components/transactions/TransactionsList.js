import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import classes from "./TransactionsList.module.css"

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
        <Box className={classes.container}>
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.list}
          >
            {transactions.map((transaction, index) => (
              <ListItem key={Math.floor(Math.random() * 99999)}>
                <Transaction
                  transaction={transaction}
                  deleteTransactionHandler={deleteTransactionHandler}
                  index={index}
                  key={Math.floor(Math.random() * 99999)}
                />
              </ListItem>
            ))}
            {provided.placeholder}
          </List>
        </Box>
      )}
    </Droppable>
  )
}

export default TransactionsList
