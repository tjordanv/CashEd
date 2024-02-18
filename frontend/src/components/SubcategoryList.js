import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Divider, IconButton, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import { usdFormatter } from "../utils/usdFormatter"
import { useLoaderData } from "react-router-dom"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { ClassNames } from "@emotion/react"
import classes from "./DashboardTest.module.css"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Collapse from "@mui/material/Collapse"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const StyledListItemButton = styled(ListItemButton)(({ theme, props }) => ({
  marginLeft: 25,
  borderRadius: 8,
  "&:hover": {
    backgroundColor: props.hoverColor
  },
  "&.Mui-selected": {
    backgroundColor: props.selectedColor
  },
  "&.Mui-selected:hover": {
    backgroundColor: props.hoverColor
  }
}))

// classes used for styling the card when expanded
const expandClasses = (isExpanded) =>
  `${classes["expandMore"]} ${isExpanded ? classes["expandMoreExpanded"] : ""}`

const SubcategoryList = ({
  isSelected,
  setIsSelected,
  isExpanded,
  setIsExpanded,
  categoryTotal,
  categories,
  events
}) => {
  return (
    <FormGroup className={classes.subcategory}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={(e) => {
                setIsSelected(e.target.checked)
                setIsExpanded(e.target.checked)
              }}
              sx={{
                "&.Mui-checked": {
                  color: "rgba(23, 195, 178, 1)"
                }
              }}
            />
          }
          label={
            <>
              <Typography className={classes.reducedLineHeight} variant="h6">
                Income
              </Typography>
              <Typography
                className={classes.reducedLineHeight}
                variant="subtitle1"
              >
                {usdFormatter(categoryTotal)}
              </Typography>
            </>
          }
        />
        <IconButton
          className={expandClasses(isExpanded)}
          aria-expanded={isExpanded}
          aria-label="show more"
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List dense={true} className={classes.subcategoryList}>
          {categories.map((item, index) => (
            <Tooltip
              arrow
              placement="right"
              key={index}
              title={
                <Typography variant="subtitle1">
                  {usdFormatter(item.total)}
                </Typography>
              }
            >
              <StyledListItemButton
                key={index}
                id={item.id}
                {...events(item)}
                props={{
                  selectedColor: item.color,
                  hoverColor: item.hoverColor
                }}
              >
                <ListItemText
                  primary={item.label}
                  // secondary={usdFormatter(item.value)}
                />
              </StyledListItemButton>
            </Tooltip>
          ))}
        </List>
      </Collapse>
    </FormGroup>
  )
}
export default SubcategoryList
