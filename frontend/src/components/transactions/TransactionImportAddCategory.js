import { useState, useRef } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { useLoaderData } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import Checkbox from "@mui/material/Checkbox"
import classes from "./TransactionImportAddCategory.module.css"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { Chip, ListItem, Paper } from "@mui/material"
import fetcher from "../../utils/fetchAuthorize"
import FetchError from "../../utils/fetchError"

const TransactionImportAddCategory = ({
  categoryId,
  setSubcategoriesHandler
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subcategories, setSubcategories] = useState(
    useLoaderData()[categoryId - 1].map((subcategory) => ({
      ...subcategory,
      label: subcategory.name,
      isChanged: false,
      saveChanges: true,
      selected: subcategory.active
    }))
  )

  const initialSubcategories = useRef(subcategories)

  const addCategories = async () => {
    let nonSelectedSubcategories = subcategories
      .filter((subcategory) => !subcategory.selected)
      .map((subcategory) => ({
        ...subcategory,
        active: false,
        isChanged: false
      }))

    let subcategoriesToAdd = subcategories.filter(
      (subcategory) => subcategory.selected
    )
    let subcategoryIdsToSave = subcategoriesToAdd
      .filter((subcategory) => subcategory.saveChanges && subcategory.isChanged)
      .map((subcategory) => subcategory.id)
    subcategoryIdsToSave = subcategoryIdsToSave.join(",")

    let subcategoryIdsToDelete = nonSelectedSubcategories
      .filter((subcategory) => subcategory.saveChanges && subcategory.isChanged)
      .map((subcategory) => subcategory.id)
    subcategoryIdsToDelete = subcategoryIdsToDelete.join(",")

    subcategoriesToAdd = subcategoriesToAdd.map((subcategory) => ({
      ...subcategory,
      isChanged: false,
      active: true
    }))

    const params = new URLSearchParams({
      subcategoryIdsToSave: subcategoryIdsToSave,
      subcategoryIdsToDelete: subcategoryIdsToDelete
    })
    const response = await fetcher(
      `http://localhost:8080/updateUserSubcategories?${params}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    if (!response.ok) {
      throw new FetchError.fromResponse(response)
    } else {
    }

    setSubcategoriesHandler(subcategoriesToAdd)
    setSubcategories([...subcategoriesToAdd, ...nonSelectedSubcategories])
    setIsOpen(false)
  }
  const onCloseHandler = () => {
    setIsOpen(false)
    setSubcategories(initialSubcategories.current)
  }

  const test = (e, value) => {
    e.stopPropagation()

    setSubcategories((prevState) => {
      return prevState.map((subcategory) => {
        if (subcategory.id === value.id) {
          return {
            ...subcategory,
            saveChanges: !subcategory.saveChanges
          }
        }
        return subcategory
      })
    })
  }

  const selectCategoryHandler = (value) => {
    setSubcategories((prevState) => {
      return prevState.map((subcategory) => {
        if (subcategory.id === value.id) {
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
    return isChanged && isActive ? "rgba(200, 10, 10, 0.10)" : undefined
  }
  return (
    <>
      <Tooltip title="Add categories" placement="top">
        <IconButton aria-label="Import" onClick={() => setIsOpen(true)}>
          <AddBoxIcon color="lightWhite" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        onClose={onCloseHandler}
      >
        <DialogTitle id="alert-dialog-title">
          Select categories
          <Paper
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "row",
              flexWrap: "wrap",
              p: 0.5,
              m: 0
            }}
            component="ul"
          >
            {subcategories
              .filter((subcategory) => subcategory.selected)
              .map((subcategory) => (
                <ListItem
                  key={subcategory.id}
                  sx={{ padding: "2px", width: "auto" }}
                >
                  <Chip
                    label={subcategory.name}
                    onDelete={() => selectCategoryHandler(subcategory)}
                  />
                </ListItem>
              ))}
          </Paper>
        </DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <ol style={{ padding: 0 }}>
            {subcategories.map((subcategory) => (
              <Box key={subcategory.id}>
                <li
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    background: background(
                      subcategory.active,
                      subcategory.isChanged
                    )
                  }}
                  onClick={() => selectCategoryHandler(subcategory)}
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
                      control={
                        <Switch
                          defaultChecked
                          onClick={(e) => test(e, subcategory)}
                        />
                      }
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
          </ol>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button variant="contained" onClick={addCategories}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default TransactionImportAddCategory
