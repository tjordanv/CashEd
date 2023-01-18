import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction/Transaction"
import { useSelector } from "react-redux"

import { styled } from "@mui/material/styles"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const Item = styled(List)(({ theme }) => ({
  margin: "20px 0 20px 0",
  paddingTop: 0,
  height: "70vh",
  overflowX: "hidden",
  minWidth: "175px",

  "&::-webkit-scrollbar": {
    width: "7px"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(119,119,119,0.15)",
    borderRadius: "8px"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(119,119,119,.7)",
    borderRadius: "8px"
  }
}))
const TransactionsList = ({ droppableID, subcategoryID }) => {
  TransactionsList.defaultProps = {
    subcategoryID: null
  }

  const transactions = useSelector((state) => state.transactions.value)

  const print = () => {
    console.log(transactions)
  }
  return (
    <Droppable droppableId={droppableID}>
      {(provided, snapshot) => (
        <Item ref={provided.innerRef} {...provided.droppableProps}>
          {transactions.map(
            (transaction, index) =>
              transaction.subcategoryID === subcategoryID && (
                // this causes the draggable indexes to be non-consecutive, opening up potential unexpected bugs
                // consider rendering all transactions but hiding the ones that do not belong.
                <ListItem
                  key={Math.floor(Math.random() * 99999)}
                  sx={{
                    paddingTop: 0,
                    paddingLeft: "5px",
                    paddingRight: "5px"
                  }}
                >
                  <Transaction
                    key={Math.floor(Math.random() * 99999)}
                    transaction={transaction}
                    index={index}
                  />
                </ListItem>
              )
          )}
          {provided.placeholder}
        </Item>
      )}
    </Droppable>
  )
}

export default TransactionsList
