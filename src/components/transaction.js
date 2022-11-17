import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { styled } from "@mui/material/styles"
import { deleteTransaction } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"

import { Card } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const Transaction = ({ transaction, index }) => {
  const Item = styled(Card)(({ theme }) => ({
    backgroundColor:
      transaction.categoryID === null && !transaction.isCredit
        ? "rgba(119, 119, 119, 0.15)"
        : transaction.isCredit === true
        ? "rgba(23, 195, 178, 0.3)"
        : transaction.categoryID === 1
        ? "rgba(23, 195, 178, 0.3)"
        : transaction.categoryID === 2
        ? "rgba(34, 124, 157, 0.4)"
        : transaction.categoryID === 3
        ? "rgba(255, 203, 119, 0.4)"
        : "rgba(254, 109, 115, 0.4)",
    width: "175px",
    minHeight: "32px"
  }))

  const dispatch = useDispatch()

  const deleteTrans = () => {
    if (transaction.subcategoryID) {
      dispatch(updateSubcategoryTotal({subcategoryID: transaction.subcategoryID, amount: -transaction.Amount}))
    }
    dispatch(deleteTransaction(index))
  }

  const log = () => {
    console.log(transaction)
  }
  return (
    // I may need to add additional identifiers to the draggableID to account for transactions
    // having the same description/name
    <Draggable draggableId={transaction.Description} index={index} key={transaction.ID}>
      {(provided, snapshot) => (
        <Item
          // className={`Transaction ${transaction.isCredit && "credit"}`}
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={log}
        >
          <span>{transaction.Description}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{"$" + transaction.Amount}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <DeleteIcon
            onClick={deleteTrans}
            fontSize="small"
            color="error"
            cursor="pointer"
          />
        </Item>
      )}
    </Draggable>
  )
}

export default Transaction
