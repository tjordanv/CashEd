import { Card, CardContent } from "@mui/material"
import { Draggable } from "react-beautiful-dnd"
import TransactionInfoTooltip from "./Transaction/TransactionInfoTooltip"
import ConfirmationDialog from "./HelperComponents/ConfirmationDialog"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Zoom from "@mui/material/Zoom"
import DeleteIcon from "@mui/icons-material/Delete"

const Transaction = ({ transaction, index, deleteTransactionHandler }) => {
  const confirmationDialogDetails = {
    title: "Are you sure you want to delete this transaction?",
    description:
      "This cannot be undone and this transaction will not appear in future imports.",
    confirmationLabel: "Delete"
  }
  const component = ({ func }) => (
    <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
      <IconButton sx={{ padding: "auto" }} onClick={func}>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Tooltip>
  )

  return (
    <Draggable
      draggableId={transaction.description + transaction.date}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContent>
            <p>{transaction.description}</p>
            <TransactionInfoTooltip
              date={transaction.date}
              description={transaction.description}
              amount={transaction.amount}
            />
            <ConfirmationDialog
              dialogDetails={confirmationDialogDetails}
              onConfirm={() => deleteTransactionHandler(transaction.id)}
              Component={component}
            />
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default Transaction
