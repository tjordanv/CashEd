import classes from "./AboutUsSelector.module.css"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

/**
 * @description The selector component that allows users to switch between the application bio and the creator bio on the about us page
 * @param {boolean} isCreator - used to determine if creator bio or application bio should be shown
 * @param {function} setIsCreator - the react state setter function that will modify the state of the parent component when the selector is clicked
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
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
        {/* add background divs that get colored to show current selected tab */}
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
        {/* add background divs that get colored to show current selected tab */}
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
