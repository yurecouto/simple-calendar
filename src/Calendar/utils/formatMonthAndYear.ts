import { months } from "../constants/months";

export function formatMonthAndYear(timestamp: number): string {
  const date = new Date(timestamp);

  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${monthName}, ${year}`;
}
