import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { isDialogOpen } from "../../state/addTransactionDialogSlice"

import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"

import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded"
import EditRounded from "@mui/icons-material/EditRounded"

const AddTransactionMenuButtons = () => {
  const isTransactions = useSelector(
    (state) =>
      state.transactions.value.filter(
        (transaction) => transaction.subcategoryID === null
      ).length > 0
  )

  const dispatch = useDispatch()

  const openDialogHandler = (isSingleTransaction) => {
    dispatch(isDialogOpen(isSingleTransaction))
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "absolute",
        top: isTransactions ? null : "45%",
        left: isTransactions ? null : "90px",
        "& .MuiFab-primary": { width: 38, height: 38 }
      }}
      icon={<SpeedDialIcon />}
      direction={isTransactions ? "right" : "down"}
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
