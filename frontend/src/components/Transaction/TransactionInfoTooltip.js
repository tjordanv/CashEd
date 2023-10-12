import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"
import { styled } from "@mui/material/styles"

const TooltipInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .RowBox": { display: "flex", flexDirection: "row" },

  "& .InfoName": { textAlign: "right", minWidth: "85px", marginRight: "10px" }
}))
const TransactionInfoTooltip = ({ date, name, amount }) => {
  return (
    <Tooltip
      cursor="default"
      arrow
      placement="top-end"
      title={
        <TooltipInfoBox>
          <Box className="RowBox">
            <Typography className="InfoName" variant="subtitle2">
              <u>
                <b>Date:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{date}</Typography>
          </Box>
          <Box className="RowBox">
            <Typography className="InfoName" variant="subtitle2">
              <u>
                <b>Name:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{name}</Typography>
          </Box>
          <Box className="RowBox">
            <Typography className="InfoName" variant="subtitle2">
              <u>
                <b>Amount:</b>
              </u>
            </Typography>
            <Typography variant="subtitle2">{amount}</Typography>
          </Box>
        </TooltipInfoBox>
      }
    >
      <InfoIcon
        fontSize="small"
        sx={{ margin: "auto 0 auto 0", color: "#777777" }}
      />
    </Tooltip>
  )
}

export default TransactionInfoTooltip
