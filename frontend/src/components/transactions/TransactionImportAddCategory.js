import { useState, useEffect, useRef } from "react"
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
import Typography from "@mui/material/Typography"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const TransactionImportAddCategory = ({ categoryId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[categoryId - 1].map((subcategory) => ({
      ...subcategory,
      label: subcategory.name,
      isChanged: false
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
  const updateCategoryHandler = (event, newValue) => {
    const prevValue = prevValueRef.current
    prevValueRef.current = newValue

    let changedValue
    if (!prevValue) {
      changedValue = newValue[0]
    } else if (prevValue.length < newValue.length) {
      changedValue = newValue.find((option) => !prevValue.includes(option))
    } else {
      changedValue = prevValue.find((option) => !newValue.includes(option))
    }
    setSubcategories((prevState) => {
      return prevState.map((subcategory) => {
        if (subcategory.id === changedValue.id) {
          return { ...subcategory, isChanged: !subcategory.isChanged }
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
      <Dialog open={isOpen}>
        <form onSubmit={(e) => addCategories(e)}>
          <DialogContent sx={{ width: "500px" }}>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            <Autocomplete
              onChange={(event, value) => updateCategoryHandler(event, value)}
              options={subcategories}
              disableCloseOnSelect
              disableClearable={true}
              multiple
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => (
                <Box
                  key={option.id}
                  sx={{
                    background: background(option.active, option.isChanged)
                  }}
                >
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      // defaultChecked={option.active}
                    />
                    <Box sx={{ width: "350px", padding: "5px 0" }}>
                      <Typography variant="h6">{option.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </Box>
                    <Divider variant="middle" orientation="vertical" />
                    {option.isChanged && (
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
