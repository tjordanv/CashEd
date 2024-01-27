import { useState, useEffect, useRef } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import Autocomplete from "@mui/material/Autocomplete"
import { useLoaderData } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import Checkbox from "@mui/material/Checkbox"
import classes from "./TransactionImportAddCategory.module.css"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const TransactionImportAddCategory = ({ categoryId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[categoryId - 1].map((subcategory) => ({
      ...subcategory,
      label: subcategory.name,
      isChanged: false,
      selected: subcategory.active
    }))
  )
  const [checkedState, setCheckedState] = useState(true)

  //   useEffect(() => {
  //   }, [])
  const addCategories = async () => {}
  const test = (event) => {
    event.stopPropagation()
    console.log(event.target.value)
  }

  const prevValueRef = useRef()
  const updateCategoryHandler = (event, value) => {
    setSubcategories((prevState) => {
      return prevState.map((subcategory) => {
        if (subcategory.id === value.id) {
          console.log("found it")
          return {
            ...subcategory,
            isChanged: !subcategory.isChanged,
            selected: !subcategory.selected
          }
        }
        return subcategory
      })
    })
  }

  const background = (isActive, isChanged) => {
    return isChanged && isActive ? "rgba(0, 0, 0, 0.04)" : undefined
  }
  return (
    <>
      <Tooltip title="Add new category" placement="top">
        <IconButton aria-label="Import" onClick={() => setIsOpen(true)}>
          <AddBoxIcon color="lightWhite" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Select Categories</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <Divider />
          <form onSubmit={(e) => addCategories(e)}>
            {subcategories.map((subcategory) => (
              <Box key={subcategory.id}>
                <li
                  style={{ listStyleType: "none", display: "flex" }}
                  onClick={(e) => updateCategoryHandler(e, subcategory)}
                >
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={subcategory.selected}
                  />
                  <Box sx={{ width: "350px", padding: "5px 0" }}>
                    <Typography variant="h6">{subcategory.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {subcategory.description}
                    </Typography>
                  </Box>
                  {subcategory.isChanged && (
                    <FormControlLabel
                      sx={{ width: "175px" }}
                      control={<Switch defaultChecked onClick={test} />}
                      label={
                        <Typography variant="caption">
                          Save changes for future use
                        </Typography>
                      }
                      labelPlacement="start"
                    />
                  )}
                </li>
                <Divider variant="middle" />
              </Box>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default TransactionImportAddCategory
