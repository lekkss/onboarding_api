export function generateAccountNumber(existingPhoneNumber) {
  // Ensure that the existing phone number is a string
  const acc = existingPhoneNumber.slice(-10);

  return acc;
}
