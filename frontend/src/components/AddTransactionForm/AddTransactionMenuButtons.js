import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"

import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded"
import EditRounded from "@mui/icons-material/EditRounded"

const AddTransactionMenuButtons = ({
  setIsOpen,
  setIsSingleTransaction,
  isTransactions
}) => {
  const openDialogHandler = (isSingleTransaction) => {
    setIsOpen(true)
    setIsSingleTransaction(isSingleTransaction)
  }
  const style = isTransactions
    ? { marginLeft: "116px" }
    : { marginLeft: "-35px", position: "absolute", top: "50%" }
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      // sx={{
      //   position: "absolute",
      //   top: isTransactions ? null : "45%",
      //   left: isTransactions ? null : "90px",
      //   "& .MuiFab-primary": { width: 38, height: 38 }
      // }}
      icon={<SpeedDialIcon />}
      // direction={isTransactions ? "right" : "down"}
      direction="right"
      // style={style}
    >
      <SpeedDialAction
        key="import"
        icon={<DownloadForOfflineRounded fontSize="small" />}
        tooltipTitle="Automatic Import"
        onClick={() => openDialogHandler(false)}
        sx={{ height: 35, width: 35 }}
      />
      <SpeedDialAction
        key="AddSingleTransaction"
        icon={<EditRounded fontSize="small" />}
        tooltipTitle="Add Single Transaction"
        onClick={() => openDialogHandler(true)}
        sx={{ height: 35, width: 35 }}
      />
    </SpeedDial>
  )
}
export default AddTransactionMenuButtons
