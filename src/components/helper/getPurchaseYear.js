export function getPurchaseYear(age) {
  const currentYear = new Date().getFullYear(); // Get the current year
  const purchaseYear = currentYear - age; // Subtract the age from the current year
  return purchaseYear;
}
