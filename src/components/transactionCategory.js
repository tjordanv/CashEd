import { useEffect, useState } from "react"
import Subcategory from "./subcategory"
import { useDispatch, useSelector } from "react-redux"
import data from "../app/data"

import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
import { IconButton } from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox"

import { importSubcategories } from "../state/subcategoriesSlice"

const TransactionCategory = ({ category }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      category.ID === 1
        ? "rgba(23, 195, 178, 0.45)"
        : category.ID === 2
        ? "rgba(34, 124, 157, 0.65)"
        : category.ID === 3
        ? "rgba(255, 203, 119, 0.55)"
        : "rgba(254, 109, 115, 0.6)",
    height: category.ID <= 2 ? "235px" : "500px",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    position: "relative",
    minWidth: "130px"
  }))

  const dispatch = useDispatch()

  // the fake api call to get the subcategories
  const subcategoryAPICall = new Promise(function (myResolve, myReject) {
    let subcategories = data.subcategories.filter(
      (subcategory) => subcategory.categoryID === category.ID
    )

    if (subcategories) {
      myResolve(subcategories)
    } else {
      console.log("Subcategory 'API' call failed")
      myReject([])
    }
  })

  // Fills the subcategories pulled from the DB into the global state
  useEffect(() => {
    subcategoryAPICall.then((res) => {
      dispatch(importSubcategories(res))
    })
  }, [])

  const subcategories = useSelector((state) => state.subcategories.value)

  const num = 0
  const total = useSelector((state) =>
    state.subcategories.value
      .filter((subcategory) => subcategory.categoryID === category.ID)
      .reduce((sum, subcategory) => sum + subcategory.Total, num)
      .toFixed(2)
  )

  const su = useSelector((state) => state.subcategories.value)

  const logs = () => {
    console.log(su)
  }

  return (
    <Item elevation={4}>
      <div className={"headers"}>
        <span className={"TransactionCategoryText"}>{category.name}</span>
        <br />
        <span className={"TransactionCategoryText"}>{total}</span>
      </div>
      <Stack spacing={1} className={"subs"}>
        {subcategories.map(
          (subcategory) =>
            subcategory.categoryID === category.ID && (
              <Subcategory
                subcategory={subcategory}
                droppable={false}
                key={subcategory.ID}
              />
            )
        )}
      </Stack>
      <IconButton className={"footer"} aria-label="Import" onClick={logs}>
        <AddBoxIcon color="lightWhite" fontSize="medium" />
      </IconButton>
    </Item>
  )
}

export default TransactionCategory
