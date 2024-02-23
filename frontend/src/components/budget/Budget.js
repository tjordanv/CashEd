import { useState } from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import List from "@mui/material/List"
import TransactionImportAddCategory from "../transactions/TransactionImportAddCategory"
import classes from "./Budget.module.css"
import { ListItem } from "@mui/material"
const Budget = () => {
  const [dialogDetails, setDialogDetails] = useState({
    isOpen: false,
    categoryId: 1
  })
  const [isExpanded, setIsExpanded] = useState(false)

  // classes used for styling the card when expanded
  const expandClasses = `${classes["expandMore"]} ${
    isExpanded ? classes["expandMoreExpanded"] : ""
  }`

  const openDialogHandler = (categoryId) => {
    setDialogDetails({ isOpen: true, categoryId: categoryId })
    setIsExpanded(false)
  }
  const setIsOpenHandler = (isOpen) => {
    setDialogDetails({ isOpen: isOpen, categoryId: 1 })
  }
  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label="show more"
        sx={{ color: "black", borderColor: "black" }}
      >
        Update Categories <ExpandMoreIcon className={expandClasses} />
      </Button>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List>
          <ListItem>
            <Button
              variant="contained"
              color="income"
              onClick={() => openDialogHandler(1)}
            >
              Income
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="savings"
              onClick={() => openDialogHandler(2)}
            >
              Savings & Investments
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="variable"
              onClick={() => openDialogHandler(3)}
            >
              Variable Expenditures
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="fixed"
              onClick={() => openDialogHandler(4)}
            >
              Fixed Expenditures
            </Button>
          </ListItem>
        </List>
      </Collapse>

      <TransactionImportAddCategory
        isOpen={dialogDetails.isOpen}
        setIsOpen={setIsOpenHandler}
        categoryId={dialogDetails.categoryId}
        //   setSubcategoriesHandler={setSubcategories}
      />

      <Button variant="contained">Set Category Goals</Button>
    </Box>
  )
}
export default Budget
