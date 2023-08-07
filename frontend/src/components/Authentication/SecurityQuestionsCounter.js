const SecurityQuestionsCounter = ({ count }) => {
  return (
    <>
      <p>
        For additional security and user recovery, please answer 3 security
        questions
      </p>
      <p>{count} / 3</p>
    </>
  )
}

export default SecurityQuestionsCounter
