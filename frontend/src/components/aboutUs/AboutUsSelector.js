import classes from "./AboutUsSelector.module.css"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

const AboutUsSelector = ({ isCreator, setIsCreator }) => {
  return (
    <Stack
      direction="row"
      spacing={10}
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      className={classes.container}
    >
      <div className={classes.selector} onClick={() => setIsCreator(false)}>
        <Typography variant="h6" color="primary.text">
          Get to know your money
        </Typography>
        {!isCreator && (
          <>
            <div></div>

            <div></div>
          </>
        )}
      </div>
      <div className={classes.selector} onClick={() => setIsCreator(true)}>
        <Typography variant="h6" color="primary.text">
          Get to know the creator
        </Typography>
        {isCreator && (
          <>
            <div></div>
            <div></div>
          </>
        )}
      </div>
    </Stack>
  )
}

export default AboutUsSelector