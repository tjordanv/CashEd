function validate(password) {
  // At least one uppercase, one number, one special character and minimum 8 characters
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const isValid = regex.test(password)

  return isValid
}

export default function validatePasswordCriteria(password) {
  return validate(password)
}
