import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const TransactionImportAddCategory = ({ categoryId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[categoryId - 1].map((subcategory) => ({
      ...subcategory,
      label: subcategory.name
    }))
  )
  //   useEffect(() => {
  //   }, [])
  const addCategories = async () => {}
  const test = () => {
    console.log("test")
  }
  return (
    <>
      <Tooltip title="Add new category" placement="top">
        <IconButton aria-label="Import" onClick={() => setIsOpen(true)}>
          <AddBoxIcon color="lightWhite" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen}>
        <form onSubmit={(e) => addCategories(e)}>
          <DialogContent sx={{ width: "500px" }}>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            <Autocomplete
              onChange={test}
              options={subcategories}
              disableCloseOnSelect
              multiple
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <Box>
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name} : {option.description}
                    <FormControlLabel
                      sx={{ marginLeft: "auto" }}
                      control={
                        <Checkbox
                          defaultChecked
                          onClick={(event) => {
                            event.stopPropagation()
                          }}
                        />
                      }
                      label="Save changes for future use"
                      labelPlacement="start"
                    />
                  </li>
                  <Divider variant="middle" />
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  placeholder="Categories"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
export default TransactionImportAddCategory
