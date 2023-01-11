import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"

const TransactionInfoTooltip = ({ transactionInfo }) => {
  return (
    <Tooltip
      cursor="default"
      arrow
      title={
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "right",
                minWidth: "85px",
                marginRight: "10px"
              }}
            >
              <u>
                <b>Date:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{transactionInfo.date}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "right",
                minWidth: "85px",
                marginRight: "10px"
              }}
            >
              <u>
                <b>Description:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{transactionInfo.Description}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "right",
                minWidth: "85px",
                marginRight: "10px"
              }}
            >
              <u>
                <b>Amount:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{transactionInfo.Amount}</Typography>
          </Box>
        </Box>
      }
      placement="top-end"
    >
      <InfoIcon fontSize="small" sx={{ margin: "auto 0 auto 0", color: "#777777" }} />
    </Tooltip>
  )
}

export default TransactionInfoTooltip
