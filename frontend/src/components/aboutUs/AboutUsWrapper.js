import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import classes from "./AboutUsWrapper.module.css"

/**
 * The Card wrapper used to build the application and creator bio cards
 * @param {object} props an object of property values. As of now, 'size' is the only property
 * that would be used. Size determines the size of the container
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
