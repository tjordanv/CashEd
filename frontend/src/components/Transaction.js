import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { styled } from "@mui/material/styles"
import { deleteTransaction } from "../state/transactionsSlice"
import { updateSubcategoryTotal } from "../state/subcategoriesSlice"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"
import TransactionInfoTooltip from "./TransactionInfoTooltip"

import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

const Transaction = ({ transaction, index }) => {
  const Item = styled(Card)(({ theme }) => ({
    display: "flex",
    marginRight: "3px !important",
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
    minWidth: "175px",
    minHeight: "32px",
    flexShrink: 0,
    position: "relative",
    borderColor: "#ffffff",
    "&:hover": { border: "1px solid red" },

    "& .MuiTypography-root": {
      fontWeight: 300,
      fontSize: "14px",
      minWidth: "160px"
    }
  }))

  const dispatch = useDispatch()

  const deleteTransactionHandler = () => {
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

  // make this function into something that allows the user to edit the transaction on double click
  const log = () => {
    console.log(transaction)
  }
  return (
    <Draggable
      draggableId={transaction.Description + transaction.date}
      index={index}
      key={transaction.ID}
    >
      {(provided, snapshot) => (
        <Item
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={log}
        >
          <TransactionInfoTooltip
            date={transaction.date}
            description={transaction.Description}
            amount={transaction.Amount}
          />
          <Box sx={{ margin: "auto 0 auto 5px", width: "85%" }}>
            <Typography
              variant="body2"
              align="center"
              sx={{ paddingTop: "2px", paddingBottom: "2px" }}
            >
              {transaction.Description.slice(0, 20)}
            </Typography>
            <Divider variant="middle" />
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontWeight: "600",
                paddingTop: "2px",
                paddingBottom: "2px"
              }}
            >
              {"$" + transaction.Amount}
            </Typography>
          </Box>
          <DeleteConfirmationDialog onDelete={deleteTransactionHandler} />
        </Item>
      )}
    </Draggable>
  )
}

export default Transaction
