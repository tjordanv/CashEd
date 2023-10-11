import { Card, CardContent } from "@mui/material"

const TransactionSubcategory = ({ subcategory }) => {
  return (
    <Card>
      <CardContent>
        <p>{subcategory.name}</p>
      </CardContent>
    </Card>
  )
}

export default TransactionSubcategory
