import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { styled } from "@mui/material/styles"
import { deleteTransaction } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"

import { Card } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Typography from "@mui/material/Typography"

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
    minHeight: "32px",
    flexShrink: 0,
    position: "relative",
    borderColor: "#ffffff",
    "&:hover": { border: "1px solid red" }
  }))

  const TransactionText = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontSize: "12px",
    maxWidth: "160px"
  }))

  const DeleteButton = styled(DeleteIcon)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    left: 160,
    right: 0
    //margin: "0 auto 0 auto"
  }))
  const dispatch = useDispatch()

  const deleteTrans = () => {
    if (transaction.subcategoryID) {
      dispatch(
        updateSubcategoryTotal({
          subcategoryID: transaction.subcategoryID,
          amount: -transaction.Amount
        })
      )
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
          <TransactionText variant="body2" align="center">
            {transaction.Description}
          </TransactionText>
          <TransactionText variant="body2" align="center">
            {"$" + transaction.Amount}
          </TransactionText>
          <DeleteButton
            onClick={deleteTrans}
            fontSize=""
            color="error"
            cursor="pointer"
          />
        </Item>
      )}
    </Draggable>
  )
}

export default Transaction
