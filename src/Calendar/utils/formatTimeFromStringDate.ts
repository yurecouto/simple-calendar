export function formatTimeFromStringDate(dateString: string) {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
}
