import AddTransactionMenuButtons from "./AddTransactionMenuButtons"
import AddTransactionForm from "./AddTransactionForm"
import Box from "@mui/material/Box"
import { useState } from "react"
const AddTransactionContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSingleTransaction, setIsSingleTransaction] = useState(false)

  return (
    <Box>
      <AddTransactionMenuButtons
        setIsOpen={setIsOpen}
        setIsSingleTransaction={setIsSingleTransaction}
      />
      <AddTransactionForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSingleTransaction={isSingleTransaction}
      />
    </Box>
  )
}

export default AddTransactionContainer
