// Validate date format (DD/MM/YYYY)
export const isValidDateFormat = (dateString) => {
  if (!dateString) return false;
  
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;
  
  const [, day, month, year] = dateString.match(regex);
  
  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);
  
  if (monthInt < 1 || monthInt > 12) return false;
  
  const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
  if (dayInt < 1 || dayInt > daysInMonth) return false;
  
  return true;
};

// Check if date is not in the future
export const isNotFutureDate = (dateString) => {
  if (!isValidDateFormat(dateString)) return false;
  
  const [, day, month, year] = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  
  // JavaScript months are 0-indexed
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate <= today;
};

// Validate product name (not more than 100 characters)
export const isValidProductName = (name) => {
  return name && name.trim().length > 0 && name.length <= 100;
};

// Validate quantity (must be a positive integer)
export const isValidQuantity = (quantity) => {
  const parsedQuantity = parseInt(quantity, 10);
  return !isNaN(parsedQuantity) && parsedQuantity > 0 && Number.isInteger(parsedQuantity);
}; 