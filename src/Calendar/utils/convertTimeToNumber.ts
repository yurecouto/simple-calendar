export function convertTimeToNumber(date: Date): number {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const timeInNumber: number = hours + minutes / 60;

  return timeInNumber;
}
