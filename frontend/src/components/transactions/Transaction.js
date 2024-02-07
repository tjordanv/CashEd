import { Card, CardContent } from "@mui/material"
import TransactionTooltip from "./TransactionTooltip"
import ConfirmationDialog from "../../uiComponents/ConfirmationDialog"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Zoom from "@mui/material/Zoom"
import DeleteIcon from "@mui/icons-material/Delete"
import classes from "./Transaction.module.css"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { usdFormatter } from "../../utils/usdFormatter"

const component = ({ func }) => (
  <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
    <IconButton sx={{ padding: "auto", width: "35px" }} onClick={func}>
      <DeleteIcon fontSize="small" color="#777777" />
    </IconButton>
  </Tooltip>
)

const backgroundColor = (transaction) => {
  if (transaction.isCredit) {
    return "rgba(23, 195, 178, 0.3)"
  } else {
    switch (transaction.categoryId) {
      case 1:
        return "rgba(23, 195, 178, 0.3)"
      case 2:
        return "rgba(34, 124, 157, 0.4)"
      case 3:
        return "rgba(255, 203, 119, 0.4)"
      case 4:
        return "rgba(254, 109, 115, 0.4)"
      default:
        return "rgba(255, 255, 255, 0.9)"
    }
  }
}

const getItemStyle = (provided, style, isDragging) => {
  const draggablePropsStyle = provided
    ? { ...provided.draggableProps.style }
    : null

  const combined = {
    ...style,
    ...draggablePropsStyle
  }
  const withSpacing = {
    ...combined,
    height: "60px",
    paddingLeft: 0
  }
  return withSpacing
}

const Transaction = ({
  transaction,
  style,
  deleteTransactionHandler,
  provided
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [name, setName] = useState(() => {
    const firstWord = transaction.name.split(" ")[0]
    return firstWord.length < 15
      ? transaction.name.slice(0, 20)
      : transaction.name.slice(0, 14)
  })

  const confirmationDialogDetails = {
    title: "Delete transaction?",
    description:
      "This cannot be undone and this transaction will not appear in future imports.",
    confirmationLabel: "Delete"
  }
  const draggableProps = provided ? { ...provided.draggableProps } : null
  const dragHandleProps = provided ? { ...provided.dragHandleProps } : null

  return (
    <Card
      ref={provided ? provided.innerRef : null}
      {...draggableProps}
      {...dragHandleProps}
      style={getItemStyle(provided, style)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className={classes.transactionCardContent}
        style={{ "--backgroundColor": backgroundColor(transaction) }}
      >
        {(isHovered && (
          <TransactionTooltip
            date={transaction.date}
            name={transaction.name}
            amount={transaction.amount}
            accountName={transaction.accountName}
          />
        )) || <div className={classes.spacer}></div>}

        <Box sx={{ width: "85%" }}>
          <Typography
            variant="body2"
            align="center"
            sx={{
              paddingTop: "2px",
              paddingBottom: "2px",
              maxWidth: "140px",
              overflow: "hidden",
              textWrap: "nowrap"
            }}
          >
            {transaction.name}
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
            {usdFormatter(transaction.amount)}
          </Typography>
        </Box>
        {(isHovered && (
          <ConfirmationDialog
            dialogDetails={confirmationDialogDetails}
            onConfirm={() => deleteTransactionHandler(transaction)}
            Component={component}
          />
        )) || <div className={classes.spacer}></div>}
      </CardContent>
    </Card>
  )
}

export default Transaction
