import { useEffect } from "react"
import Subcategory from "../Subcategory"
import { useDispatch, useSelector } from "react-redux"
import data from "../../app/data copy"

import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
import { Divider, IconButton, Typography } from "@mui/material"
import Container from "@mui/material/Container"
import AddBoxIcon from "@mui/icons-material/AddBox"

import { importSubcategories } from "../../state/subcategoriesSlice"

const CategoryPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "ID"
})(({ theme, ID }) => ({
  margin: "0 10px 0 10px",
  backgroundColor:
    ID === 1
      ? "rgba(23, 195, 178, 0.45)"
      : ID === 2
      ? "rgba(34, 124, 157, 0.65)"
      : ID === 3
      ? "rgba(255, 203, 119, 0.55)"
      : "rgba(254, 109, 115, 0.6)",
  height: ID <= 2 ? "35vh" : "75vh",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  position: "relative",
  minWidth: "130px",

  "& .SubcategoryList": {
    height: ID <= 2 ? "20vh" : "55vh",
    overflowY: "auto",
    paddingTop: "2px",
    paddingBottom: "2px",

    "&::-webkit-scrollbar": {
      width: "7px"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: "8px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(119,119,119,.7)",
      borderRadius: "8px"
    }
  }
}))

const TransactionCategory = ({ category }) => {
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

  const su = useSelector((state) => state.transactions.value)

  const logs = () => {
    console.log(su)
  }

  return (
    <CategoryPaper elevation={4} ID={category.ID}>
      <Container sx={{ marginBottom: "2vh" }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#454545",
            fontStyle: "italic"
          }}
        >
          {category.name}
        </Typography>
        <Divider variant="middle" />
        <Typography>{total}</Typography>
        <Divider variant="middle" />
      </Container>
      <Stack className="SubcategoryList" spacing={2}>
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
      <IconButton
        aria-label="Import"
        onClick={logs}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          margin: "0 auto 0 auto"
        }}
      >
        <AddBoxIcon color="lightWhite" fontSize="large" />
      </IconButton>
    </CategoryPaper>
  )
}

export default TransactionCategory
