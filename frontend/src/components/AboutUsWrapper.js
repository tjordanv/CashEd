import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import classes from "./AboutUsWrapper.module.css"

const AboutUsWrapper = (props, { size }) => {
  return (
    <Card className={classes.card} style={{ "--size": size }}>
      <CardContent className={classes.cardContents}>
        {props.children}
      </CardContent>
    </Card>
  )
}
export default AboutUsWrapper
