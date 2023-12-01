import Button from "@mui/material/Button"
const SaveTransactionsButton = ({ transactions, isActiveSubcategory }) => {
  const style = isActiveSubcategory
    ? null
    : { marginLeft: "-28px", position: "absolute", top: "50%" }
  return (
    <Button
      variant="contained"
      size="large"
      sx={{ marginTop: "14px" }}
      style={style}
    >
      Save
    </Button>
  )
}
export default SaveTransactionsButton
