import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import classes from "./AboutUsWrapper.module.css"

/**
 * @description The Card wrapper used to build the application and creator bio cards
 * @param {object} props - an object of property values.
 * @param {string} props.size - the size of the card.
 * @example <AboutUsWrapper size="small">...</AboutUsWrapper>
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
const AboutUsWrapper = (props) => {
  const { size } = props

  return (
    <Card className={classes.card} style={{ "--size": size }}>
      <CardContent className={classes.cardContents}>
        {props.children}
      </CardContent>
    </Card>
  )
}
export default AboutUsWrapper
