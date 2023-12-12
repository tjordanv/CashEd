import classes from "./AboutUsBio.module.css"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import AboutUsWrapper from "./AboutUsWrapper"

/**
 * @description The bio component used in the About Us page to describe CasedEd as an application
 * @returns {JSX.Element} The JSX code for the component that will be displayed in the browser
 */
const AboutUsBio = () => {
  const paragraphLines = [
    `A phrase that embodies the mission of Finance App. With endless information at our fingertips, too often 
  do the important things get lost or forgotten. Your money should not be one of those things.`,

    `Simply having information is not always enough; more importantly is what we do with that information.`,

    `Finance App provides the tools necessary to successfully
  control your personal finances. As you set budgets and goals, your performance can be easily tracked in real time. Your spending
  and deposits are automatically brought into an easy to use drag and drop system that allows you to quickly get your hands on
  each transaction and categorize them appropriately. A deep understanding of your spending habits and overall financial health 
  will be gained through the use of simple, yet powerful, tools such as spending forecast calculators, beautiful charts, and more.`,

    `Know your money, own your money.`
  ]
  const information = [
    {
      header: "Lorem ipsum dolor sit amet consectetur",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Feugiat sed lectus vestibulum mattis ullamcorper."
    },
    {
      header:
        "qui officia deserunt mollit anim id est laborum. Nisi scelerisque eu ultrices ",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Feugiat sed lectus vestibulum mattis ullamcorper."
    },
    {
      header: "Nisi scelerisque eu ultrices vitae auctor eu augue ut",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Feugiat sed lectus vestibulum mattis ullamcorper."
    },
    {
      header:
        "ullamco laboris commodo consequat nisi ut aliquip ex ea commodo consequat",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
    },
    {
      header:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Feugiat sed lectus vestibulum mattis ullamcorper. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Feugiat sed lectus vestibulum mattis ullamcorper."
    }
  ]
  return (
    <AboutUsWrapper size="510px">
      <Stack spacing={2} alignItems="center" className={classes.stack}>
        {information.map((info) => (
          <div>
            <Typography variant="h6" color="primary.text">
              {info.header}
            </Typography>
            <Typography variant="body2" color="primary.text">
              {info.text}
            </Typography>
          </div>
        ))}
      </Stack>
    </AboutUsWrapper>
  )
}

export default AboutUsBio
