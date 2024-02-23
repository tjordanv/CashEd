import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"

import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded"
import EditRounded from "@mui/icons-material/EditRounded"

const AddTransactionMenuButtons = ({
  setIsOpen,
  setIsSingleTransaction,
  isTransactions,
  isDragging
}) => {
  const openDialogHandler = (isSingleTransaction) => {
    setIsOpen(true)
    setIsSingleTransaction(isSingleTransaction)
  }
  const direction = isTransactions ? "right" : "down"
  const style = isTransactions
    ? { marginLeft: "116px" }
    : { marginLeft: "-28px", position: "absolute", top: "50%" }
  return (
    <SpeedDial
      hidden={isDragging}
      ariaLabel="SpeedDial basic example"
      icon={<SpeedDialIcon />}
      direction={direction}
      style={style}
    >
      <SpeedDialAction
        key="import"
        icon={<DownloadForOfflineRounded />}
        tooltipTitle="Automatic Import"
        onClick={() => openDialogHandler(false)}
      />
      <SpeedDialAction
        key="AddSingleTransaction"
        icon={<EditRounded />}
        tooltipTitle="Add Single Transaction"
        onClick={() => openDialogHandler(true)}
      />
    </SpeedDial>
  )
}
export default AddTransactionMenuButtons
