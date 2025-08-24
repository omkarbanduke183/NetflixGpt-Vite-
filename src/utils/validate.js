export const validateEmailPassword = (email, password, confirmPassword) => {
  const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
    email
  );
  const validatePassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Email validation
  if (!validateEmail) return "Email is not valid";

  // Password validation
  if (!validatePassword) return "Password is not valid";

  // Only check confirmPassword if it's provided (for sign up)
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};
