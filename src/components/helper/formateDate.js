import { format } from "date-fns";

export function formatDate(date) {
  if (!date) return ""; // Return an empty string if no date is provided

  try {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return format(parsedDate, "dd MMM yyyy, hh:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}
